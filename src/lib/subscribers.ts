import fs from "fs";
import path from "path";

export interface SubscriberStore {
  add(email: string): Promise<{ success: boolean; message: string }>;
  list(): Promise<string[]>;
  has(email: string): Promise<boolean>;
}

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify({ subscribers: [] }, null, 2));
  }
}

function readSubscribers(): string[] {
  ensureDataDir();
  const data = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
  return data.subscribers || [];
}

function writeSubscribers(subscribers: string[]) {
  ensureDataDir();
  fs.writeFileSync(
    SUBSCRIBERS_FILE,
    JSON.stringify({ subscribers }, null, 2)
  );
}

export const fileSubscriberStore: SubscriberStore = {
  async add(email: string) {
    const subscribers = readSubscribers();
    const normalized = email.toLowerCase().trim();

    if (subscribers.includes(normalized)) {
      return { success: false, message: "Already subscribed!" };
    }

    subscribers.push(normalized);
    writeSubscribers(subscribers);
    return { success: true, message: "Successfully subscribed!" };
  },

  async list() {
    return readSubscribers();
  },

  async has(email: string) {
    const subscribers = readSubscribers();
    return subscribers.includes(email.toLowerCase().trim());
  },
};
