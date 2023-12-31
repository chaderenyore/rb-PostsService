const { format, createLogger, transports } = require("winston");

const { combine, timestamp, label, printf } = format;

//Using the printf format.
        const customFormat = printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
          });
          
          const logger = createLogger({
            level: "debug",
            format: combine(label({ label: 'POSTS SERVICE' }), timestamp(), customFormat),
            transports: [new transports.Console()],
          });

          module.exports = logger;