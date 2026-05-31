import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

export function useZodForm<T extends FieldValues>(
  schema: z.ZodType<T>,
  options?: Omit<UseFormProps<T>, "resolver"> & {
    defaultValues?: DefaultValues<T>;
  }
): UseFormReturn<T> {
  return useForm<T>({
    ...options,
    // @hookform/resolvers typings target a different Zod major than this project
    resolver: zodResolver(schema as never),
  });
}
