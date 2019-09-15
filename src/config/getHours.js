export default function (time) {
  const hour = new Date(time).getHours()
  let minutes = new Date(time).getMinutes()

  minutes = minutes < 10 ? `0${minutes}` : minutes

  return `${hour}:${minutes}`
}