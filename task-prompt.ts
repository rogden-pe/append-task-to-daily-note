import { App, SuggestModal } from "obsidian";

export class TaskPrompt extends SuggestModal<string> {
    result: string;
    onSubmit: (result: string) => void;

    constructor(app: App, onSubmit: (result: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

    // Returns all available suggestions.
    getSuggestions(query: string): string[] {
        this.result = query;
        return ["submit"];
    }

    // Renders each suggestion item.
    renderSuggestion(item: string, el: HTMLElement) {
        el.createEl("div", { text: item });
    }

    // Perform action on the selected suggestion.
    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        this.close();
        this.onSubmit(this.result);
    }
}