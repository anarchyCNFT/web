import React from "react";
import CoinSelection from '../../wallet/coinSelection.mjs'
import { Buffer } from 'buffer'
let Cardano = null

window.$ = window.jQuery = import("jquery");

const _Buffer = Buffer



async function activateCardano() {
	console.log('connecting');
	await window.cardano?.enable()
}

async function blocks_latest() {
	return await fetch('https://cardano-mainnet.blockfrost.io/api/v0/blocks/latest', {
		headers: {
			'Content-Type': 'application/json',
			'project_id': 'GHf1olOJblaj5LD8rcRudajSJGKRU6IL'
		}
	}).then((response) =>  response.json()).catch((error) => error.response.data)
};


async function parameters() {
	return await fetch('https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest/parameters', {
		headers: {
			'Content-Type': 'application/json',
			'project_id': 'GHf1olOJblaj5LD8rcRudajSJGKRU6IL'
		}
	}).then((response) => response.json()).catch((error) => error.response.data)
};

async function getProtocolParameters() {
	// var HOST = process.env.API ? process.env.API : location.origin;
	const latest_block = await blocks_latest();

	var slotnumber = latest_block.slot;

	const p = await parameters()

	var value = {
		linearFee: Cardano.LinearFee.new(
			Cardano.BigNum.from_str(p.min_fee_a.toString()),
			Cardano.BigNum.from_str(p.min_fee_b.toString())
		),
		minUtxo: Cardano.BigNum.from_str(p.min_utxo),
		poolDeposit: Cardano.BigNum.from_str(p.pool_deposit),
		keyDeposit: Cardano.BigNum.from_str(p.key_deposit),
		maxTxSize: p.max_tx_size,
		slot: slotnumber,
	};
	return value;
};


async function triggerPay() {
	try {
		activateCardano();
	} catch (e) {
		console.error(e);
	} finally {
		console.log('We do cleanup here');
	}
	if (!Cardano)
	{
		Cardano = await import(
			'@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib'
		);
	}  
	//var user = await window.cardano.getUsedAddresses();
	var address = "addr1...."
	
	return await pay(address, 1.2);
}

async function pay(addr, adaAmount) {
	const cardano = window.cardano
	const protocolParameters = await getProtocolParameters()
	const lovelace = (parseFloat(adaAmount) * 1000000).toString()


	const paymentAddr = Cardano.Address.from_bytes(_Buffer.from(await cardano.getChangeAddress(), 'hex')).to_bech32()
	const rawUtxo = await cardano.getUtxos()
	const utxos = rawUtxo.map(u => Cardano.TransactionUnspentOutput.from_bytes(_Buffer.from(u, 'hex')))
	const outputs = Cardano.TransactionOutputs.new()

	outputs.add(
		Cardano.TransactionOutput.new(
			Cardano.Address.from_bech32(addr),
			Cardano.Value.new(
				Cardano.BigNum.from_str(lovelace)
			)
		)
	)

	const MULTIASSET_SIZE = 5848;
	const VALUE_SIZE = 5860;
	const totalAssets = 0
	CoinSelection.setProtocolParameters(
		protocolParameters.minUtxo.to_str(),
		protocolParameters.linearFee.coefficient().to_str(),
		protocolParameters.linearFee.constant().to_str(),
		protocolParameters.maxTxSize.toString()
	);

	const selection = await CoinSelection.randomImprove(
		utxos,
		outputs,
		20 + totalAssets,
		protocolParameters.minUtxo.to_str()
	);

	const inputs = selection.input;
	const txBuilder = Cardano.TransactionBuilder.new(
		protocolParameters.linearFee,
		protocolParameters.minUtxo,
		protocolParameters.poolDeposit,
		protocolParameters.keyDeposit
	);

	for (let i = 0; i < inputs.length; i++) {
		const utxo = inputs[i];
		txBuilder.add_input(
			utxo.output().address(),
			utxo.input(),
			utxo.output().amount()
		);
	}

	txBuilder.add_output(outputs.get(0));

	const change = selection.change;
	const changeMultiAssets = change.multiasset();

	// check if change value is too big for single output
	if (changeMultiAssets && change.to_bytes().length * 2 > VALUE_SIZE) {
		const partialChange = Cardano.Value.new(
			Cardano.BigNum.from_str('0')
		);

		const partialMultiAssets = Cardano.MultiAsset.new();
		const policies = changeMultiAssets.keys();
		const makeSplit = () => {
			for (let j = 0; j < changeMultiAssets.len(); j++) {
				const policy = policies.get(j);
				const policyAssets = changeMultiAssets.get(policy);
				const assetNames = policyAssets.keys();
				const assets = Cardano.Assets.new();
				for (let k = 0; k < assetNames.len(); k++) {
					const policyAsset = assetNames.get(k);
					const quantity = policyAssets.get(policyAsset);
					assets.insert(policyAsset, quantity);
					//check size
					const checkMultiAssets = Cardano.MultiAsset.from_bytes(
						partialMultiAssets.to_bytes()
					);
					checkMultiAssets.insert(policy, assets);
					if (checkMultiAssets.to_bytes().length * 2 >= MULTIASSET_SIZE) {
						partialMultiAssets.insert(policy, assets);
						return;
					}
				}
				partialMultiAssets.insert(policy, assets);
			}
		};
		makeSplit();
		partialChange.set_multiasset(partialMultiAssets);
		const minAda = Cardano.min_ada_required(
			partialChange,
			protocolParameters.minUtxo
		);
		partialChange.set_coin(minAda);

		txBuilder.add_output(
			Cardano.TransactionOutput.new(
				Cardano.Address.from_bech32(paymentAddr),
				partialChange
			)
		);
	}

	txBuilder.add_change_if_needed(
		Cardano.Address.from_bech32(paymentAddr)
	);

	const transaction = Cardano.Transaction.new(
		txBuilder.build(),
		Cardano.TransactionWitnessSet.new(),
	);

	const size = transaction.to_bytes().length * 2;
	if (size > protocolParameters.maxTxSize) throw "Mmax tx size"

	const witneses = await cardano.signTx(_Buffer.from(transaction.to_bytes(), 'hex').toString('hex'))
	const signedTx = Cardano.Transaction.new(transaction.body(), Cardano.TransactionWitnessSet.from_bytes(_Buffer.from(witneses, "hex"))) // ,transaction.metadata()
	const txhash = await cardano.submitTx(_Buffer.from(signedTx.to_bytes(), 'hex').toString('hex'))

	return txhash
}

function Buy() {
	const leftToSell = 0
	React.useEffect(() => {
			
		},
	[])
	return (
		<>
			<button type="button" disabled style={{ width: "25%" }} onClick={() => triggerPay()} className="btn btn-light d-none d-md-block">Buy with Nami</button>
		</>
	);

}

export default Buy;

