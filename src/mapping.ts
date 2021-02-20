import { Address, ethereum } from "@graphprotocol/graph-ts";
import {
  BurnCall,
  ControlledSafeTransferFromCall,
  ControlledTransferFromCall,
  NewURI,
  Resolve,
  SafeTransferFromChild1Call,
  Transfer,
  TransferFromChildCall,
} from "../generated/Registry/Registry";
import { ResetRecords, Set } from "../generated/Resolver/Resolver";
import {
  Resolver,
  Domain,
  Account,
  Record,
  Set as SetEvent,
  Transfer as TransferEvent,
  ResetRecord as ResetRecordEvent,
} from "../generated/schema";

const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

/*
  Event Handlers
*/

export function handleNewURI(event: NewURI): void {
  const node = event.params.tokenId.toHexString();
  const domain = Domain.load(node);
  domain.name = event.params.uri;
  domain.save();
}

export function handleResolve(event: Resolve): void {
  const node = event.params.tokenId.toHexString();
  const domain = Domain.load(node);
  let resolver = Resolver.load(createResolverID(node, event.params.to));
  if (resolver == null) {
    resolver = new Resolver(createResolverID(node, event.params.to));
    resolver.domain = domain.id;
    resolver.address = event.params.to;
    resolver.save();
  }
  domain.resolver = resolver.id;
  domain.save();
}

export function handleTransfer(event: Transfer): void {
  const node = event.params.tokenId.toHexString();
  let domain = Domain.load(node);
  if (domain == null) {
    domain = new Domain(node);
    domain.createdAt = event.block.timestamp;
  }
  let account = Account.load(event.params.to.toHexString());
  if (account == null) {
    account = new Account(event.params.to.toHexString());
    account.save();
  }
  domain.owner = account.id;
  domain.save();
  const domainEvent = new TransferEvent(createEventID(event));
  domainEvent.blockNumber = event.block.number.toI32();
  domainEvent.transactionID = event.transaction.hash;
  domainEvent.domain = domain.id;
  domainEvent.owner = account.id;
  domainEvent.save();
}

export function handleResetRecords(event: ResetRecords): void {
  const node = event.params.tokenId.toHexString();

  let resolver = Resolver.load(createResolverID(node, event.address));
  if (resolver == null) {
    resolver = new Resolver(createResolverID(node, event.address));
  }
  resolver.records = [];
  resolver.save();
  const resolverEvent = new ResetRecordEvent(createEventID(event));
  resolverEvent.resolver = resolver.id;
  resolverEvent.blockNumber = event.block.number.toI32();
  resolverEvent.transactionID = event.transaction.hash;
  resolverEvent.save();
}

export function handleSet(event: Set): void {
  const node = event.params.tokenId.toHexString();
  let resolver = Resolver.load(createResolverID(node, event.address));
  if (resolver == null) {
    resolver = new Resolver(createResolverID(node, event.address));
    resolver.save();
  }

  let record = Record.load(resolver.id.concat(event.params.key));
  if (record == null) {
    record = new Record(resolver.id.concat(event.params.key));
  }
  record.key = event.params.key;
  record.value = event.params.value;
  record.save();
  if (!resolver.records.includes(record.id)) {
    let records = resolver.records;
    records.push(record.id);
    resolver.records = records;
    resolver.save();
  }

  const resolverEvent = new SetEvent(createEventID(event));
  resolverEvent.resolver = resolver.id;
  resolverEvent.blockNumber = event.block.number.toI32();
  resolverEvent.transactionID = event.transaction.hash;
  resolverEvent.key = event.params.key;
  resolverEvent.value = event.params.value;
  resolverEvent.save();
}

/*
  Call Handlers
*/

export function handleBurn(event: BurnCall): void {
  const node = event.inputs.tokenId.toHexString();
  let domain = Domain.load(node);
  if (domain != null) {
    domain.resolver = null;
    domain.owner = EMPTY_ADDRESS;
    domain.name = "";
    domain.save();
  }
}

export function handleControlledSafeTransferFrom(
  event: ControlledSafeTransferFromCall
): void {
  const node = event.inputs.tokenId.toHexString();
  const domain = Domain.load(node);
  domain.resolver = null;
  domain.save();
}

export function handleSafeTransferFromChild(
  event: SafeTransferFromChild1Call
): void {
  const node = event.inputs.tokenId.toHexString();
  const domain = Domain.load(node);
  domain.resolver = null;
  domain.save();
}

export function handleControlledTransferFrom(
  event: ControlledTransferFromCall
): void {
  const node = event.inputs.tokenId.toHexString();
  const domain = Domain.load(node);
  domain.resolver = null;
  domain.save();
}

export function handleTransferFromChild(event: TransferFromChildCall): void {
  const node = event.inputs.tokenId.toHexString();
  const domain = Domain.load(node);
  domain.resolver = null;
  domain.save();
}

/*
  Helpers
*/

function createResolverID(node: string, resolver: Address): string {
  return resolver
    .toHexString()
    .concat("-")
    .concat(node);
}

function createEventID(event: ethereum.Event): string {
  return event.block.number
    .toString()
    .concat("-")
    .concat(event.logIndex.toString());
}
