// @ts-nocheck

import { Plugin, Notice } from "obsidian";
import { TaskPrompt } from "./task-prompt";

export default class AddTask extends Plugin {
	addLeadingZero(num: Number) {
		return num < 10 ? "0" + num : num;
	}

	calcDailyNoteName() {
		var today = new Date();
		var year = today.getFullYear();
		var month = this.addLeadingZero(today.getMonth() + 1);
		var day = this.addLeadingZero(today.getDate());
		
		return year + "-" + month + "-" + day;
	}

	async onload() {
		this.addCommand({
		id: "append-to-daily-note",
		name: "Append",
		callback: async () => {
			try {
				const { vault } = this.app;
				var files = vault.getMarkdownFiles();
				var dailyNoteName = this.calcDailyNoteName();
				var dailyNote = null;

				for (let i = 0; i < files.length; i++) {
					if (files[i].basename == dailyNoteName) {
						dailyNote = files[i];
						break;
					}
				}

				if (dailyNote) {
					new TaskPrompt(this.app, async (taskDescription) => {
						let contents = await vault.read(dailyNote);
						vault.modify(dailyNote, contents.trimEnd() + "\n> - [ ] " + taskDescription);
					  }).open();
					
				} else {
					new Notice("Daily note \"" + dailyNoteName + "\" was not found");
				}

			} catch(e) {
				new Notice(e);
			}
		},
		});
	}
}