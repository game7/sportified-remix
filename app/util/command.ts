import { type Params } from "@remix-run/react";
import { transform } from "lodash";
import { type z, type ZodSchema } from "zod";

type CommandRawInput<T extends Record<string, ZodSchema>> = {
  [k in keyof T]: z.infer<T[k]> | FormData | Params<string>;
};

type CommandInput<T extends Record<string, ZodSchema>> = {
  [k in keyof T]: z.infer<T[k]>;
};

export interface CommandFactory<T extends Record<string, ZodSchema>> {
  (input: CommandRawInput<T>): Command<T>;
  type: string;
  schema: T;
}
export interface Command<T extends Record<string, ZodSchema>> {
  input: CommandInput<T>;
  type: string;
}

export class CommandBuilder<T extends Record<string, ZodSchema> = {}> {
  // eslint-disable-next-line no-useless-constructor
  private constructor(public readonly type: string, readonly schemas: T) {}

  static as(type: string): CommandBuilder {
    return new CommandBuilder(type, {});
  }

  add<K extends string, V>(
    key: K,
    schema: ZodSchema<V>
  ): CommandBuilder<T & { [k in K]: ZodSchema<V> }> {
    const nextPart = { [key]: schema } as { [k in K]: ZodSchema<V> };
    return new CommandBuilder(this.type, { ...this.schemas, ...nextPart });
  }

  params<Q>(schema: ZodSchema<Q>) {
    return this.add("params", schema);
  }

  data<V>(schema: ZodSchema<V>) {
    return this.add("data", schema);
  }

  meta<M>(schema: ZodSchema<M>) {
    return this.add("meta", schema);
  }

  build(): CommandFactory<T> {
    const factory = (factoryInput: CommandRawInput<T>) => {
      return {
        type: this.type,
        input: parse(factoryInput, this.schemas),
      };
    };
    factory.type = this.type;
    factory.schema = this.schemas;
    return factory;
  }
}

function parse<T extends Record<string, ZodSchema> = {}>(
  rawInput: CommandRawInput<T>,
  schema: T
) {
  return transform(
    rawInput,
    (result, value, key) => {
      result[key] = schema[key].parse(value);
      return result;
    },
    {} as CommandInput<T>
  );
}

export function handle<T extends Record<string, ZodSchema> = {}, R = unknown>(
  factory: CommandFactory<T>,
  procedure: (input: CommandInput<T>) => Promise<R>
) {
  return async (command: Command<T>) => {
    const { input } = command;

    return await procedure(parse(input, factory.schema));
  };
}
