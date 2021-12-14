import { TransactionWithSender, TransactionCall } from 'web3-common';
import { Web3RequestManager } from 'web3-core';
import {
	Address,
	BlockNumberOrTag,
	Uint256,
	HexString32Bytes,
	HexStringBytes,
	Uint,
	Filter,
	validateAddress,
	validateBlockNumberOrTag,
	validateBoolean,
	validateHexString8Bytes,
	validateHexString32Bytes,
	validateHexStringInput,
	validateFilterObject,
	validateStringInput,
	validateNumbersInput,
	HexString8Bytes,
} from 'web3-utils';
import { validateTransactionCall, validateTransactionWithSender } from './validation';
import { Web3EthExecutionApi } from './web3_eth_execution_api';

export async function getProtocolVersion(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_protocolVersion',
		params: [],
	});
}

export async function getSyncing(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_syncing',
		params: [],
	});
}

export async function getCoinbase(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_coinbase',
		params: [],
	});
}

export async function getMining(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_mining',
		params: [],
	});
}

export async function getHashRate(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_hashrate',
		params: [],
	});
}

export async function getGasPrice(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_gasPrice',
		params: [],
	});
}

export async function getFeeHistory(
	requestManager: Web3RequestManager,
	blockCount: Uint,
	newestBlock: BlockNumberOrTag,
	rewardPercentiles: number[],
) {
	validateHexStringInput(blockCount);
	validateBlockNumberOrTag(newestBlock);
	for (const rewardPercentile of rewardPercentiles) {
		validateNumbersInput(rewardPercentile, { onlyIntegers: false });
	}

	return requestManager.send({
		method: 'eth_feeHistory',
		params: [blockCount, newestBlock, rewardPercentiles],
	});
}

export async function getAccounts(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_accounts',
		params: [],
	});
}

export async function getBlockNumber(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_blockNumber',
		params: [],
	});
}

export async function getBalance(
	requestManager: Web3RequestManager,
	address: Address,
	blockNumber: BlockNumberOrTag,
) {
	validateAddress(address);
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_getBalance',
		params: [address, blockNumber],
	});
}

export async function getStorageAt(
	requestManager: Web3RequestManager,
	address: Address,
	storageSlot: Uint256,
	blockNumber: BlockNumberOrTag,
) {
	validateAddress(address);
	validateHexStringInput(storageSlot);
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_getStorageAt',
		params: [address, storageSlot, blockNumber],
	});
}

export async function getTransactionCount(
	requestManager: Web3RequestManager,
	address: Address,
	blockNumber: BlockNumberOrTag,
) {
	validateAddress(address);
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_getTransactionCount',
		params: [address, blockNumber],
	});
}

export async function getBlockTransactionCountByHash(
	requestManager: Web3RequestManager,
	blockHash: HexString32Bytes,
) {
	validateHexString32Bytes(blockHash);

	return requestManager.send({
		method: 'eth_getBlockTransactionCountByHash',
		params: [blockHash],
	});
}

export async function getBlockTransactionCountByNumber(
	requestManager: Web3RequestManager,
	blockNumber: BlockNumberOrTag,
) {
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_getBlockTransactionCountByNumber',
		params: [blockNumber],
	});
}

export async function getUncleCountByBlockHash(
	requestManager: Web3RequestManager,
	blockHash: HexString32Bytes,
) {
	validateHexString32Bytes(blockHash);

	return requestManager.send({
		method: 'eth_getUncleCountByBlockHash',
		params: [blockHash],
	});
}

export async function getUncleCountByBlockNumber(
	requestManager: Web3RequestManager,
	blockNumber: BlockNumberOrTag,
) {
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_getUncleCountByBlockNumber',
		params: [blockNumber],
	});
}

export async function getCode(
	requestManager: Web3RequestManager,
	address: Address,
	blockNumber: BlockNumberOrTag,
) {
	validateAddress(address);
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_getCode',
		params: [address, blockNumber],
	});
}

export async function sign(
	requestManager: Web3RequestManager,
	address: Address,
	message: HexStringBytes,
) {
	validateAddress(address);
	validateHexStringInput(message);

	return requestManager.send({
		method: 'eth_sign',
		params: [address, message],
	});
}

export async function signTransaction(
	requestManager: Web3RequestManager,
	transaction: TransactionWithSender,
) {
	validateTransactionWithSender(transaction);

	return requestManager.send({
		method: 'eth_signTransaction',
		params: [transaction],
	});
}

export async function sendTransaction(
	requestManager: Web3RequestManager,
	transaction: TransactionWithSender,
) {
	validateTransactionWithSender(transaction);

	return requestManager.send({
		method: 'eth_sendTransaction',
		params: [transaction],
	});
}

export async function sendRawTransaction(
	requestManager: Web3RequestManager,
	transaction: HexStringBytes,
) {
	validateHexStringInput(transaction);

	return requestManager.send({
		method: 'eth_sendRawTransaction',
		params: [transaction],
	});
}

export async function call(
	requestManager: Web3RequestManager,
	transaction: TransactionCall,
	blockNumber: BlockNumberOrTag,
) {
	validateTransactionCall(transaction);
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_call',
		params: [transaction, blockNumber],
	});
}

// TODO Not sure how to best validate Partial<TransactionWithSender>
export async function estimateGas(
	requestManager: Web3RequestManager,
	transaction: Partial<TransactionWithSender>,
	blockNumber: BlockNumberOrTag,
) {
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_estimateGas',
		params: [transaction, blockNumber],
	});
}

export async function getBlockByHash(
	requestManager: Web3RequestManager,
	blockHash: HexString32Bytes,
	hydrated: boolean,
) {
	validateHexString32Bytes(blockHash);
	validateBoolean(hydrated);

	return requestManager.send({
		method: 'eth_getBlockByHash',
		params: [blockHash, hydrated],
	});
}

export async function getBlockByNumber(
	requestManager: Web3RequestManager,
	blockNumber: BlockNumberOrTag,
	hydrated: boolean,
) {
	validateBlockNumberOrTag(blockNumber);
	validateBoolean(hydrated);

	return requestManager.send({
		method: 'eth_getBlockByNumber',
		params: [blockNumber, hydrated],
	});
}

export async function getTransactionByHash(
	requestManager: Web3RequestManager,
	transactionHash: HexString32Bytes,
) {
	validateHexString32Bytes(transactionHash);

	return requestManager.send({
		method: 'eth_getTransactionByHash',
		params: [transactionHash],
	});
}

export async function getPendingTransactions(
	requestManager: Web3RequestManager<Web3EthExecutionApi>,
) {
	return requestManager.send({
		method: 'eth_pendingTransactions',
		params: [],
	});
}

export async function getTransactionByBlockHashAndIndex(
	requestManager: Web3RequestManager,
	blockHash: HexString32Bytes,
	transactionIndex: Uint,
) {
	validateHexString32Bytes(blockHash);
	validateHexStringInput(transactionIndex);

	return requestManager.send({
		method: 'eth_getTransactionByBlockHashAndIndex',
		params: [blockHash, transactionIndex],
	});
}

export async function getTransactionByBlockNumberAndIndex(
	requestManager: Web3RequestManager,
	blockNumber: BlockNumberOrTag,
	transactionIndex: Uint,
) {
	validateBlockNumberOrTag(blockNumber);
	validateHexStringInput(transactionIndex);

	return requestManager.send({
		method: 'eth_getTransactionByBlockNumberAndIndex',
		params: [blockNumber, transactionIndex],
	});
}

export async function getTransactionReceipt(
	requestManager: Web3RequestManager,
	transactionHash: HexString32Bytes,
) {
	validateHexString32Bytes(transactionHash);

	return requestManager.send({
		method: 'eth_getTransactionReceipt',
		params: [transactionHash],
	});
}

export async function getUncleByBlockHashAndIndex(
	requestManager: Web3RequestManager,
	blockHash: HexString32Bytes,
	uncleIndex: Uint,
) {
	validateHexString32Bytes(blockHash);
	validateHexStringInput(uncleIndex);

	return requestManager.send({
		method: 'eth_getUncleByBlockHashAndIndex',
		params: [blockHash, uncleIndex],
	});
}

export async function getUncleByBlockNumberAndIndex(
	requestManager: Web3RequestManager,
	blockNumber: BlockNumberOrTag,
	uncleIndex: Uint,
) {
	validateBlockNumberOrTag(blockNumber);
	validateHexStringInput(uncleIndex);

	return requestManager.send({
		method: 'eth_getUncleByBlockNumberAndIndex',
		params: [blockNumber, uncleIndex],
	});
}

export async function getCompilers(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_getCompilers',
		params: [],
	});
}

export async function compileSolidity(requestManager: Web3RequestManager, code: string) {
	validateStringInput(code);

	return requestManager.send({
		method: 'eth_compileSolidity',
		params: [code],
	});
}

export async function compileLLL(requestManager: Web3RequestManager, code: string) {
	validateStringInput(code);

	return requestManager.send({
		method: 'eth_compileLLL',
		params: [code],
	});
}

export async function compileSerpent(requestManager: Web3RequestManager, code: string) {
	validateStringInput(code);

	return requestManager.send({
		method: 'eth_compileSerpent',
		params: [code],
	});
}

export async function newFilter(requestManager: Web3RequestManager, filter: Filter) {
	validateFilterObject(filter);

	return requestManager.send({
		method: 'eth_newFilter',
		params: [filter],
	});
}

export async function newBlockFilter(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_newBlockFilter',
		params: [],
	});
}

export async function newPendingTransactionFilter(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_newPendingTransactionFilter',
		params: [],
	});
}

export async function uninstallFilter(requestManager: Web3RequestManager, filterIdentifier: Uint) {
	validateHexStringInput(filterIdentifier);

	return requestManager.send({
		method: 'eth_uninstallFilter',
		params: [filterIdentifier],
	});
}

export async function getFilterChanges(requestManager: Web3RequestManager, filterIdentifier: Uint) {
	validateHexStringInput(filterIdentifier);

	return requestManager.send({
		method: 'eth_getFilterChanges',
		params: [filterIdentifier],
	});
}

export async function getFilterLogs(requestManager: Web3RequestManager, filterIdentifier: Uint) {
	validateHexStringInput(filterIdentifier);

	return requestManager.send({
		method: 'eth_getFilterLogs',
		params: [filterIdentifier],
	});
}

export async function getLogs(requestManager: Web3RequestManager, filter: Filter) {
	validateFilterObject(filter);

	return requestManager.send({
		method: 'eth_getLogs',
		params: [filter],
	});
}

export async function getWork(requestManager: Web3RequestManager) {
	return requestManager.send({
		method: 'eth_getWork',
		params: [],
	});
}

export async function submitWork(
	requestManager: Web3RequestManager,
	nonce: HexString8Bytes,
	seedHash: HexString32Bytes,
	difficulty: HexString32Bytes,
) {
	validateHexString8Bytes(nonce);
	validateHexString32Bytes(seedHash);
	validateHexString32Bytes(difficulty);

	return requestManager.send({
		method: 'eth_submitWork',
		params: [nonce, seedHash, difficulty],
	});
}

export async function submitHashrate(
	requestManager: Web3RequestManager,
	hashRate: HexString32Bytes,
	id: HexString32Bytes,
) {
	validateHexString32Bytes(hashRate);
	validateHexString32Bytes(id);

	return requestManager.send({
		method: 'eth_submitHashrate',
		params: [hashRate, id],
	});
}

export async function requestAccounts(requestManager: Web3RequestManager<Web3EthExecutionApi>) {
	return requestManager.send({
		method: 'eth_requestAccounts',
		params: [],
	});
}

export async function getChainId(requestManager: Web3RequestManager<Web3EthExecutionApi>) {
	return requestManager.send({
		method: 'eth_chainId',
		params: [],
	});
}

export async function clientVersion(requestManager: Web3RequestManager<Web3EthExecutionApi>) {
	return requestManager.send({
		method: 'web3_clientVersion',
		params: [],
	});
}

export async function getProof(
	requestManager: Web3RequestManager<Web3EthExecutionApi>,
	address: Address,
	storageKeys: HexString32Bytes[],
	blockNumber: BlockNumberOrTag,
) {
	validateAddress(address);
	storageKeys.forEach(storageKey => validateHexString32Bytes(storageKey));
	validateBlockNumberOrTag(blockNumber);

	return requestManager.send({
		method: 'eth_getProof',
		params: [address, storageKeys, blockNumber],
	});
}
