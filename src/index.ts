import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { ExecOptions } from '@actions/exec/lib/interfaces';

process.on('unhandledRejection', handleError)
main().catch(handleError)

async function main(): Promise<void> {
    try { 
        let tag = await getLastestTag();
        if (tag) {
            core.info(`version: ${tag}`); 
            core.setOutput('version', tag);  
        } else {
            core.setFailed(`No valid tag found: ${tag}`)
        } 
    } catch (e: any) {
        core.setFailed(e.message);
    }
}

async function getLastestTag(): Promise<string | undefined> {
    let tag: string | undefined;
    const options: ExecOptions = {
        listeners: {
            stdout: (data: Buffer) => {
                tag = data.toString().trim(); 
            },
            stderr: (data: Buffer) => {
                core.error(data.toString().trim());
                core.setFailed('No tag found on this branch, please verify you have one in your remote repository and the fetch-depth option set to 0, on the checkout action.');
            }
        }
    };
    await exec.exec('git', ['describe', '--tags', '--abbrev=0'], options);
    return tag;
}
 
function handleError(e: any): void {
    console.error(e)
    core.setFailed(`Unhandled error: ${e}`)
}
