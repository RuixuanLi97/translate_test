import * as fs from 'fs';
import { detailedDiff, deletedDiff } from 'deep-object-diff';
import source from './en';  // Adjusted to import directly the default export

async function translate(targetFile: string, srcLang: string, tarLang: string) {
    // Function to simulate translation
    async function translateText(text: string, srcLang: string, tarLang: string): Promise<string> {
        // Here you would use an actual translation API
        return `Translated(${text})`;  // Placeholder function
    }

    // Load target i18n file (fallback to an object that matches the structure of the source if not exists)
    let target = {};
    try {
        if (fs.existsSync(targetFile)) {
            const importedModule = require(`./${targetFile}`);
            target = importedModule.default || {};  // Use .default to get the actual export, ensuring it exists
        }
    } catch (err) {
        console.error('Failed to load or parse the target file, initializing with an empty object.', err);
    }

    // Clean up items that are deleted in the source
    const cleanup = (sourceObj: any, targetObj: any) => {
        Object.keys(targetObj).forEach(key => {
            if (!sourceObj.hasOwnProperty(key)) {
                delete targetObj[key];  // Delete key from target if it's not found in source
            } else if (typeof targetObj[key] === 'object' && typeof sourceObj[key] === 'object') {
                cleanup(sourceObj[key], targetObj[key]);
            }
        });
    };

    cleanup(source, target);

    const recursiveTranslate = async (sourceObj: any, targetObj: any) => {
        for (const key in sourceObj) {
            if (typeof sourceObj[key] === 'string') {
                // Translate string if it does not exist in target
                if (!targetObj.hasOwnProperty(key)) {
                    targetObj[key] = await translateText(sourceObj[key], srcLang, tarLang);
                }
            } else if (typeof sourceObj[key] === 'function') {
                // Copy functions directly if not present in target
                if (!targetObj.hasOwnProperty(key)) {
                    targetObj[key] = sourceObj[key];
                }
            } else if (typeof sourceObj[key] === 'object') {
                // Recurse into objects
                if (!targetObj[key]) {
                    targetObj[key] = {};
                }
                await recursiveTranslate(sourceObj[key], targetObj[key]);
            }
        }
    };

    await recursiveTranslate(source, target);

    // Custom function to serialize object including functions
    const serialize = (obj: any, depth = 0): string => {
        const indent = '    '; // 4 spaces for indentation
        let entries = Object.entries(obj).map(([key, value]) => {
            const prefix = `${'\n' + indent.repeat(depth + 1)}`;
            if (typeof value === 'string' || typeof value === 'number') {
                return `${prefix}${JSON.stringify(key)}: ${JSON.stringify(value)}`;
            } else if (typeof value === 'function') {
                const functionBody = value.toString().replace(/\n/g, `\n${indent.repeat(depth + 2)}`);
                return `${prefix}${JSON.stringify(key)}: ${functionBody}`;
            } else {
                return `${prefix}${JSON.stringify(key)}: ${serialize(value, depth + 1)}`;
            }
        });

        return `{${entries.join(',')}\n${indent.repeat(depth)}}`;
    };

    // Save the updated target i18n file
    const formattedData = `export default ${serialize(target)};`;
    fs.writeFileSync(targetFile, formattedData, 'utf8');
}

// Usage of the function
translate('fr.ts', 'en', 'fr').then(() => {
    console.log('Translation complete.');
}).catch(err => {
    console.error('Error during translation:', err);
});
