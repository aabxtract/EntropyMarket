'use server';
/**
 * @fileOverview A Genkit flow that assigns verifiable entropy scores to newly minted seeds using a randomness oracle.
 *
 * - assignEntropyPurity - A function that handles the assignment of entropy purity to a seed.
 * - AssignEntropyPurityInput - The input type for the assignEntropyPurity function.
 * - AssignEntropyPurityOutput - The return type for the assignEntropyPurity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssignEntropyPurityInputSchema = z.object({
  seedId: z.string().describe('The unique identifier of the entropy seed.'),
});
export type AssignEntropyPurityInput = z.infer<typeof AssignEntropyPurityInputSchema>;

const AssignEntropyPurityOutputSchema = z.object({
  entropyPurity: z
    .number()
    .min(0)
    .max(100)
    .describe('The entropy purity score assigned to the seed (0-100).'),
  randomnessSignature: z
    .string()
    .describe('A visual waveform representation of the seed randomness.'),
});
export type AssignEntropyPurityOutput = z.infer<typeof AssignEntropyPurityOutputSchema>;

export async function assignEntropyPurity(input: AssignEntropyPurityInput): Promise<AssignEntropyPurityOutput> {
  return assignEntropyPurityFlow(input);
}

const assignEntropyPurityPrompt = ai.definePrompt({
  name: 'assignEntropyPurityPrompt',
  input: {schema: AssignEntropyPurityInputSchema},
  output: {schema: AssignEntropyPurityOutputSchema},
  prompt: `You are a randomness oracle responsible for assigning entropy purity scores to digital seeds.

  Based on the seed ID, generate a verifiable entropy score between 0 and 100, ensuring a fair and transparent distribution of purity levels. Also create a randomness signature (visual waveform).

  Seed ID: {{{seedId}}}
`,
});

const assignEntropyPurityFlow = ai.defineFlow(
  {
    name: 'assignEntropyPurityFlow',
    inputSchema: AssignEntropyPurityInputSchema,
    outputSchema: AssignEntropyPurityOutputSchema,
  },
  async input => {
    const {output} = await assignEntropyPurityPrompt(input);
    return output!;
  }
);
