export default function Keyboard({kind, isPBT, filter}) {
  const kindDir = {
    0: 'sixty-percent',
    1: 'seventy-five-percent',
    2: 'eighty-percent',
    3: 'iso-105',
  }[kind]

  const fileName = isPBT ? 'PBT' : 'ABS'

  const imagePath = `keyboards/${kindDir}/${fileName}.png`;

  return <img className={"h-[230px] w-[360px] rounded-lg p-2 border border-slate-400 " + filter} src={imagePath} />
}