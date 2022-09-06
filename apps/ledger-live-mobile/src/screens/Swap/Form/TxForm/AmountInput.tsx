import React from "react";
import { Flex, Text } from "@ledgerhq/native-ui";
import { StyleSheet } from "react-native";
import { BigNumber } from "bignumber.js";
import { Unit } from "@ledgerhq/types-cryptoassets";
import CurrencyInput from "../../../../components/CurrencyInput";

interface Props {
  value: BigNumber | undefined;
  editable: boolean;
  unit: Unit | undefined;
  onChange: (_: BigNumber) => void;
  error: Error | undefined;
}

export function AmountInput({ value, onChange, editable, unit, error }: Props) {
  return (
    <Flex justifyContent="flex-end" alignItems="flex-end">
      {unit ? (
        <CurrencyInput
          editable={editable}
          onChange={onChange}
          unit={unit}
          value={value}
          inputStyle={styles.inputText}
          hasError={!!error}
          dynamicFontRatio={0.3}
        />
      ) : (
        <Text variant="h1" color="neutral.c70">
          -
        </Text>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create({
  inputText: {
    textAlign: "right",
  },
});