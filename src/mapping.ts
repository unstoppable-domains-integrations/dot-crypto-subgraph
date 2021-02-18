import { Address, log } from "@graphprotocol/graph-ts";
import { NewURI, Resolve, Transfer } from "../generated/Registry/Registry";
import { ResetRecords, Set } from "../generated/Resolver/Resolver";
import { Resolver, Domain, Account, Record } from "../generated/schema";

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
  domain.resolver = null;
  domain.owner = account.id;
  domain.save();
}

export function handleResetRecords(event: ResetRecords): void {
  const node = event.params.tokenId.toHexString();

  let resolver = Resolver.load(createResolverID(node, event.address));
  if (resolver == null) {
    resolver = new Resolver(createResolverID(node, event.address));
  }
  resolver.records = [];
  resolver.save();
}

export function handleSet(event: Set): void {
  const node = event.params.tokenId.toHexString();
  let record = Record.load(createRecordID(node, event.params.key));
  if (record == null) {
    record = new Record(createRecordID(node, event.params.key));
  }
  record.key = event.params.key;
  record.value = event.params.value;
  record.save();
  let resolver = Resolver.load(createResolverID(node, event.address));
  if (resolver == null) {
    resolver = new Resolver(createResolverID(node, event.address));
  }
  resolver.records.push(record.id);
  resolver.save();
}

function createRecordID(node: string, key: String): string {
  return node.concat("-").concat(key.toString());
}

function createResolverID(node: string, resolver: Address): string {
  return resolver
    .toHexString()
    .concat("-")
    .concat(node);
}
