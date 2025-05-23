// This file is machine-generated - DO NOT EDIT.

'use server';

/**
 * @fileOverview AI-powered property recommendation flow.
 *
 * This file defines a Genkit flow that suggests similar properties based on a given property listing.
 *
 * @remarks
 * The flow takes a property description as input and returns recommendations for similar properties.
 *
 * @exports recommendProperties - A function that triggers the property recommendation flow.
 * @exports RecommendPropertiesInput - The input type for the recommendProperties function.
 * @exports RecommendPropertiesOutput - The return type for the recommendProperties function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const RecommendPropertiesInputSchema = z.object({
  propertyDescription: z.string().describe('The description of the property for which to find recommendations.'),
  propertyType: z.enum(['residential', 'commercial']).describe('The type of the property (residential or commercial).')
});
export type RecommendPropertiesInput = z.infer<typeof RecommendPropertiesInputSchema>;

const RecommendPropertiesOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      description: z.string().describe('A short description of the recommended property.'),
      propertyType: z.enum(['residential', 'commercial']).describe('The type of the recommended property.'),
      price: z.number().describe('The price of the recommended property.'),
      location: z.string().describe('The location of the recommended property')
    })
  ).describe('An array of recommended properties.')
});
export type RecommendPropertiesOutput = z.infer<typeof RecommendPropertiesOutputSchema>;

export async function recommendProperties(input: RecommendPropertiesInput): Promise<RecommendPropertiesOutput> {
  return recommendPropertiesFlow(input);
}

const recommendPropertiesPrompt = ai.definePrompt({
  name: 'recommendPropertiesPrompt',
  input: {schema: RecommendPropertiesInputSchema},
  output: {schema: RecommendPropertiesOutputSchema},
  prompt: `You are a real estate expert. Based on the following property description, recommend three similar properties.

Property Type: {{{propertyType}}}
Description: {{{propertyDescription}}}

Ensure that the property type for each recommendation matches the input property type.

Format your response as a JSON array of property recommendations, including a short description, property type, price and location for each.`
});

const recommendPropertiesFlow = ai.defineFlow(
  {
    name: 'recommendPropertiesFlow',
    inputSchema: RecommendPropertiesInputSchema,
    outputSchema: RecommendPropertiesOutputSchema,
  },
  async input => {
    const {output} = await recommendPropertiesPrompt(input);
    return output!;
  }
);
