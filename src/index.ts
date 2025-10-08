// src/index.ts
/**
 * Main entry point for ElasticSupply
 */

import { ElasticSupply } from './elasticsupply';
import minimist from 'minimist';

/**
 * Command line argument interface
 */
interface Args {
    /**
     * Enable verbose mode
     */
    verbose?: boolean;
    /**
     * Input file path
     */
    input?: string;
    /**
     * Output file path
     */
    output?: string;
}

/**
 * Parse command line arguments
 */
const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main application entry point
 */
async function main(): Promise<void> {
    try {
        // Create ElasticSupply instance
        const app = new ElasticSupply({
            verbose: args.verbose || false
        });

        // Log processing start message if verbose mode is enabled
        if (args.verbose) {
            console.log('Starting ElasticSupply processing...');
        }

        // Execute ElasticSupply processing
        const result = await app.execute();
        
        // Log results save message if output file is specified
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        // Log processing completion message
        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        // Log error message and exit with non-zero status code
        console.error('Error:', error);
        process.exit(1);
    }
}

// Entry point check
if (require.main === module) {
    main();
}