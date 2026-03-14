// src/components/ReputationBadge.tsx

interface ReputationBadgeProps {
  tier: string
}

const tierStyles: Record<string, { bg: string; text: string; dot: string }> = {
  SuperReliable: {
    bg: 'bg-green-500/20 border border-green-500/40',
    text: 'text-green-400',
    dot: 'bg-green-400',
  },
  Trustworthy: {
    bg: 'bg-blue-500/20 border border-blue-500/40',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  Considerable: {
    bg: 'bg-yellow-500/20 border border-yellow-500/40',
    text: 'text-yellow-400',
    dot: 'bg-yellow-400',
  },
  Risky: {
    bg: 'bg-orange-500/20 border border-orange-500/40',
    text: 'text-orange-400',
    dot: 'bg-orange-400',
  },
  Fraudster: {
    bg: 'bg-red-500/20 border border-red-500/40',
    text: 'text-red-400',
    dot: 'bg-red-400',
  },
}

const fallback = {
  bg: 'bg-gray-500/20 border border-gray-500/40',
  text: 'text-gray-400',
  dot: 'bg-gray-400',
}

export default function ReputationBadge({ tier }: ReputationBadgeProps) {
  const styles = tierStyles[tier] ?? fallback

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {tier || 'Unknown'}
    </span>
  )
}