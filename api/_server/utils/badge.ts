import { makeBadge } from 'badge-maker'

export function errorBadge (msg?: string): string {
  return makeBadge({
    label: 'visitor',
    message: msg ?? 'error',
    color: 'red'
  })
}

export function visitorBadge (count: number): string {
  return makeBadge({
    label: 'visitor',
    message: count.toString(),
    color: 'blue'
  })
}
