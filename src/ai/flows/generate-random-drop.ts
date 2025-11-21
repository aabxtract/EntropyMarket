'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating a random drop (loot, traits, rewards) when a user burns an entropy seed.
 *
 * - generateRandomDrop - A function that handles the random drop generation process.
 * - GenerateRandomDropInput - The input type for the generateRandomDrop function.
 * - GenerateRandomDropOutput - The return type for the generateRandomDrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRandomDropInputSchema = z.object({
  entropyPurity: z
    .number()
    .describe('The entropy purity of the seed (0-100), influencing the rarity of the drop.'),
  seedId: z.string().describe('The ID of the entropy seed being burned.'),
});
export type GenerateRandomDropInput = z.infer<typeof GenerateRandomDropInputSchema>;

const GenerateRandomDropOutputSchema = z.object({
  dropType: z.string().describe('The type of drop received (e.g., Rare artifact, Token reward, Trait modifier, Special badge).'),
  dropDescription: z.string().describe('A description of the drop received.'),
  rarity: z.string().describe('The rarity of the drop (e.g., Common, Uncommon, Rare, Legendary).'),
});
export type GenerateRandomDropOutput = z.infer<typeof GenerateRandomDropOutputSchema>;

export async function generateRandomDrop(input: GenerateRandomDropInput): Promise<GenerateRandomDropOutput> {
  return generateRandomDropFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRandomDropPrompt',
  input: {schema: GenerateRandomDropInputSchema},
  output: {schema: GenerateRandomDropOutputSchema},
  prompt: `You are the Entropy Market's Random Drop Generator. A user has burned seed ID {{seedId}} with entropy purity {{entropyPurity}}. Based on the seed's entropy purity, determine the type, description, and rarity of the random drop they receive. Higher entropy purity increases the likelihood of rarer drops.

Consider these drop types:
- Rare artifact: A unique digital collectible.
- Token reward: A quantity of in-game tokens.
- Trait modifier: An enhancement to a user's profile or assets.
- Special badge: A unique badge displayed on the user's profile.

Respond with a drop type, a short description of the drop, and its rarity.

Example:
{
  "dropType": "Rare artifact",
  "dropDescription": "A shimmering quantum shard, resonating with pure entropy.",
  "rarity": "Rare"
}`,
});

const generateRandomDropFlow = ai.defineFlow(
  {
    name: 'generateRandomDropFlow',
    inputSchema: GenerateRandomDropInputSchema,
    outputSchema: GenerateRandomDropOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
