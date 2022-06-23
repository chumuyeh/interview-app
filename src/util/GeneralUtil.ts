export function validateInput(input: string): boolean {
    var letters: RegExp = /^[A-Za-z'`\-.() ]+$/;
    if (letters.test(input)) {
        return true;
    }
    else {
        return false;
    }
}