import {isDevMode} from '../constants/environment';

enum LogColors {
  Reset = '\x1b[0m',
  Bright = '\x1b[1m',
  Dim = '\x1b[2m',
  Underscore = '\x1b[4m',
  Blink = '\x1b[5m',
  Reverse = '\x1b[7m',
  Hidden = '\x1b[8m',

  FgBlack = '\x1b[30m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgBlue = '\x1b[34m',
  FgMagenta = '\x1b[35m',
  FgCyan = '\x1b[36m',
  FgWhite = '\x1b[37m',

  BgBlack = '\x1b[40m',
  BgRed = '\x1b[41m',
  BgGreen = '\x1b[42m',
  BgYellow = '\x1b[43m',
  BgBlue = '\x1b[44m',
  BgMagenta = '\x1b[45m',
  BgCyan = '\x1b[46m',
  BgWhite = '\x1b[47m',
}

const log = (...args: any[]) => console.log(...args);

log.complex = (title: any, ...args: any[]) => log(LogColors.Bright, LogColors.BgYellow, `\r ${title}`, LogColors.Reset, ...args);
log.info = (title: any, ...args: any[]) => log(LogColors.Bright, LogColors.BgGreen, `\r ${title}`, LogColors.Reset, ...args);
log.warn = (title: any, ...args: any[]) => log(LogColors.Bright, LogColors.BgRed, `\r ${title}`, LogColors.Reset, ...args);
log.debug = (title: any, ...args: any[]) => isDevMode && log(LogColors.Bright, LogColors.BgMagenta, `\r DEBUG:`, title, LogColors.Reset, ...args);

log.red = (...args: any[]) => log(LogColors.FgRed, ...args);
log.blue = (...args: any[]) => log(LogColors.FgBlue, ...args);
log.cyan = (...args: any[]) => log(LogColors.FgCyan, ...args);
log.green = (...args: any[]) => log(LogColors.FgGreen, ...args);
log.yellow = (...args: any[]) => log(LogColors.FgYellow, ...args);
log.magenta = (...args: any[]) => log(LogColors.FgMagenta, ...args);
log.white = (...args: any[]) => log(LogColors.FgWhite, ...args);

export default log;
