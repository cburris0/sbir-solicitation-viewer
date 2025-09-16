interface LogEntry {
	timestamp: string;
	level: string;
	message: string;
	correlationId?: string;
	[key: string]: any;
}

class Logger {
	private isDev = process.env.NODE_ENV !== "production";

	private log(level: string, message: string, meta: Record<string, any> = {}): void {
		const entry: LogEntry = {
			timestamp: new Date().toISOString(),
			level: level.toUpperCase(),
			message,
			...meta,
		};

		if (this.isDev) {
			const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
			console.log(`[${entry.level}] ${entry.message}${metaStr}`);
		} else {
			console.log(JSON.stringify(entry));
		}
	}

	info(message: string, meta?: Record<string, any>): void {
		this.log("info", message, meta);
	}

	warn(message: string, meta?: Record<string, any>): void {
		this.log("warn", message, meta);
	}

	error(message: string, meta?: Record<string, any>): void {
		this.log("error", message, meta);
	}
}

export const logger = new Logger();
