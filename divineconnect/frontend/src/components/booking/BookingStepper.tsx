import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing, borderRadius } from '../../constants/theme';

const STEPS = ['Deity', 'Temple', 'Ritual', 'Date', 'Details', 'Pay'];

interface BookingStepperProps {
  currentStep: number;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <View style={styles.container}>
      {STEPS.map((step, i) => (
        <React.Fragment key={i}>
          <View style={styles.stepWrapper}>
            <View style={[styles.stepCircle, i < currentStep && styles.stepCircleDone, i === currentStep && styles.stepCircleActive]}>
              <Text style={[styles.stepNumber, i < currentStep && styles.stepNumberDone, i === currentStep && styles.stepNumberActive]}>
                {i < currentStep ? '✓' : i + 1}
              </Text>
            </View>
            <Text style={[styles.stepLabel, i === currentStep && styles.stepLabelActive]}>{step}</Text>
          </View>
          {i < STEPS.length - 1 && <View style={[styles.line, i < currentStep && styles.lineDone]} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  stepWrapper: { alignItems: 'center', flex: 1 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  stepCircleActive: { backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.primaryDark },
  stepCircleDone: { backgroundColor: colors.success },
  stepNumber: { fontSize: fontSize.sm, fontWeight: '700', color: colors.textSecondary },
  stepNumberActive: { color: colors.white },
  stepNumberDone: { color: colors.white },
  stepLabel: { fontSize: fontSize.xs, color: colors.textLight, fontWeight: '500' },
  stepLabelActive: { color: colors.primary, fontWeight: '700' },
  line: { flex: 1, height: 2, backgroundColor: colors.border, marginBottom: 18 },
  lineDone: { backgroundColor: colors.success },
});
