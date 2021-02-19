// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Domain extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Domain entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Domain entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Domain", id.toString(), this);
  }

  static load(id: string): Domain | null {
    return store.get("Domain", id) as Domain | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string | null {
    let value = this.get("name");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set name(value: string | null) {
    if (value === null) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(value as string));
    }
  }

  get owner(): string {
    let value = this.get("owner");
    return value.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get resolver(): string | null {
    let value = this.get("resolver");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set resolver(value: string | null) {
    if (value === null) {
      this.unset("resolver");
    } else {
      this.set("resolver", Value.fromString(value as string));
    }
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get events(): Array<string> {
    let value = this.get("events");
    return value.toStringArray();
  }

  set events(value: Array<string>) {
    this.set("events", Value.fromStringArray(value));
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transfer entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transfer entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transfer", id.toString(), this);
  }

  static load(id: string): Transfer | null {
    return store.get("Transfer", id) as Transfer | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get domain(): string {
    let value = this.get("domain");
    return value.toString();
  }

  set domain(value: string) {
    this.set("domain", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }
}

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Account entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Account entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Account", id.toString(), this);
  }

  static load(id: string): Account | null {
    return store.get("Account", id) as Account | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get domains(): Array<string> {
    let value = this.get("domains");
    return value.toStringArray();
  }

  set domains(value: Array<string>) {
    this.set("domains", Value.fromStringArray(value));
  }
}

export class Resolver extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Resolver entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Resolver entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Resolver", id.toString(), this);
  }

  static load(id: string): Resolver | null {
    return store.get("Resolver", id) as Resolver | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get domain(): string | null {
    let value = this.get("domain");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set domain(value: string | null) {
    if (value === null) {
      this.unset("domain");
    } else {
      this.set("domain", Value.fromString(value as string));
    }
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get records(): Array<string> | null {
    let value = this.get("records");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set records(value: Array<string> | null) {
    if (value === null) {
      this.unset("records");
    } else {
      this.set("records", Value.fromStringArray(value as Array<string>));
    }
  }

  get events(): Array<string> {
    let value = this.get("events");
    return value.toStringArray();
  }

  set events(value: Array<string>) {
    this.set("events", Value.fromStringArray(value));
  }
}

export class Set extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Set entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Set entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Set", id.toString(), this);
  }

  static load(id: string): Set | null {
    return store.get("Set", id) as Set | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get resolver(): string {
    let value = this.get("resolver");
    return value.toString();
  }

  set resolver(value: string) {
    this.set("resolver", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }

  get key(): string {
    let value = this.get("key");
    return value.toString();
  }

  set key(value: string) {
    this.set("key", Value.fromString(value));
  }

  get value(): string {
    let value = this.get("value");
    return value.toString();
  }

  set value(value: string) {
    this.set("value", Value.fromString(value));
  }
}

export class ResetRecord extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ResetRecord entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ResetRecord entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ResetRecord", id.toString(), this);
  }

  static load(id: string): ResetRecord | null {
    return store.get("ResetRecord", id) as ResetRecord | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get resolver(): string {
    let value = this.get("resolver");
    return value.toString();
  }

  set resolver(value: string) {
    this.set("resolver", Value.fromString(value));
  }

  get blockNumber(): i32 {
    let value = this.get("blockNumber");
    return value.toI32();
  }

  set blockNumber(value: i32) {
    this.set("blockNumber", Value.fromI32(value));
  }

  get transactionID(): Bytes {
    let value = this.get("transactionID");
    return value.toBytes();
  }

  set transactionID(value: Bytes) {
    this.set("transactionID", Value.fromBytes(value));
  }
}

export class Record extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Record entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Record entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Record", id.toString(), this);
  }

  static load(id: string): Record | null {
    return store.get("Record", id) as Record | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get key(): string {
    let value = this.get("key");
    return value.toString();
  }

  set key(value: string) {
    this.set("key", Value.fromString(value));
  }

  get value(): string {
    let value = this.get("value");
    return value.toString();
  }

  set value(value: string) {
    this.set("value", Value.fromString(value));
  }
}
