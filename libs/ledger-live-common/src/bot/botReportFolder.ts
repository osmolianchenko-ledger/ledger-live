import fs from "fs";
import path from "path";
import { toAccountRaw } from "../account";
import { Account } from "../types";

function makeAppJSON(accounts: Account[]) {
  const jsondata = {
    data: {
      settings: {
        hasCompletedOnboarding: true,
      },
      accounts: accounts.map((account) => ({
        data: toAccountRaw(account),
        version: 1,
      })),
    },
  };
  return JSON.stringify(jsondata);
}

export const botReportFolder = async ({
  BOT_REPORT_FOLDER,
  body,
  slackCommentTemplate,
  allAccountsBefore,
  allAccountsAfter,
}: {
  BOT_REPORT_FOLDER: string;
  body: string;
  slackCommentTemplate: string;
  allAccountsBefore: Account[];
  allAccountsAfter: Account[];
}) => {
  if (BOT_REPORT_FOLDER) {
    await Promise.all([
      fs.promises.writeFile(
        path.join(BOT_REPORT_FOLDER, "full-report.md"),
        body,
        "utf-8"
      ),
      fs.promises.writeFile(
        path.join(BOT_REPORT_FOLDER, "slack-comment-template.md"),
        slackCommentTemplate,
        "utf-8"
      ),
      fs.promises.writeFile(
        path.join(BOT_REPORT_FOLDER, "before-app.json"),
        makeAppJSON(allAccountsBefore),
        "utf-8"
      ),
      fs.promises.writeFile(
        path.join(BOT_REPORT_FOLDER, "after-app.json"),
        makeAppJSON(allAccountsAfter),
        "utf-8"
      ),
    ]);
  }
};