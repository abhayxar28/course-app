
export function durationFn(totalSeconds) {
  const secondsNum = Number(totalSeconds)

  if (!secondsNum || isNaN(secondsNum)) return "00:00"

  const hours = Math.floor(secondsNum / 3600)
  const minutes = Math.floor((secondsNum % 3600) / 60)
  const seconds = Math.floor(secondsNum % 60)

  const pad = (n) => String(n).padStart(2, "0")

  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`
}