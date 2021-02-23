import { Address, ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  BurnCall,
  ControlledSafeTransferFromCall,
  ControlledTransferFromCall,
  NewURI,
  Resolve,
  SafeTransferFromChild1Call,
  Transfer,
  TransferFromCall,
  TransferFromChildCall,
} from "../generated/Registry/Registry";
import { ResetRecords, Set, Set1 } from "../generated/Resolver/Resolver";
import {
  Resolver,
  Domain,
  Account,
  Record,
  Resolve as ResolveEvent,
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
  if (resolver === null) {
    resolver = new Resolver(createResolverID(node, event.params.to));
    resolver.domain = domain.id;
    resolver.address = event.params.to;
    resolver.save();
  }
  domain.resolver = resolver.id;
  domain.save();

  const domainEvent = new ResolveEvent(createEventID(event));
  domainEvent.blockNumber = event.block.number.toI32();
  domainEvent.transactionID = event.transaction.hash;
  domainEvent.domain = domain.id;
  domainEvent.to = resolver.id;
  domainEvent.save();
}

export function handleTransfer(event: Transfer): void {
  const node = event.params.tokenId.toHexString();
  let domain = Domain.load(node);
  if (domain === null) {
    domain = new Domain(node);
    domain.createdAt = event.block.timestamp;
  }
  let account = Account.load(event.params.to.toHexString());
  if (account === null) {
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

  const domain = Domain.load(node);
  let resolver = Resolver.load(createResolverID(node, event.address));
  if (resolver === null) {
    resolver = new Resolver(createResolverID(node, event.address));
    resolver.address = event.address;
    resolver.domain = domain.id;
  }
  resolver.save();
  const records = resolver.records;
  if (records) {
    for (let i = 0; i <= records.length; i++) {
      const recordId = (records as string[])[i];
      const record = Record.load(recordId);
      record.resolver = null;
      record.save();
    }
  }
  const resolverEvent = new ResetRecordEvent(createEventID(event));
  resolverEvent.resolver = resolver.id;
  resolverEvent.blockNumber = event.block.number.toI32();
  resolverEvent.transactionID = event.transaction.hash;
  resolverEvent.save();
}

export function handleSetEvent(
  tokenId: BigInt,
  resolverAddress: Address,
  key: string,
  value: string,
  eventBlockNumber: BigInt,
  eventTxHash: Bytes,
  eventId: string
): void {
  const node = tokenId.toHexString();
  const domain = Domain.load(node);
  let resolver = Resolver.load(createResolverID(node, resolverAddress));
  if (resolver === null) {
    resolver = new Resolver(createResolverID(node, resolverAddress));
    resolver.address = resolverAddress;
    resolver.domain = domain.id;
    resolver.save();
  }

  let record = Record.load(resolver.id.concat(key));
  if (record === null) {
    record = new Record(resolver.id.concat(key));
  }
  record.key = key;
  record.value = value;
  // Removes record if value is empty
  if (!record.value) {
    record.resolver = null;
  } else {
    record.resolver = resolver.id;
  }
  record.save();
  const resolverEvent = new SetEvent(eventId);
  resolverEvent.resolver = resolver.id;
  resolverEvent.blockNumber = eventBlockNumber.toI32();
  resolverEvent.transactionID = eventTxHash;
  resolverEvent.key = key;
  resolverEvent.value = value;
  resolverEvent.save();
}

export function handleLegacySet(event: Set1): void {
  handleSetEvent(
    event.params.tokenId,
    event.address,
    event.params.key.toHexString(),
    event.params.value,
    event.block.number,
    event.transaction.hash,
    createEventID(event)
  );
}

export function handleSet(event: Set): void {
  handleSetEvent(
    event.params.tokenId,
    event.address,
    event.params.key,
    event.params.value,
    event.block.number,
    event.transaction.hash,
    createEventID(event)
  );
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

export function handleTransferFrom(
  event: TransferFromCall
): void {
  const node = event.inputs.tokenId.toHexString();
  const domain = Domain.load(node);
  domain.resolver = null;
  domain.save();
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
