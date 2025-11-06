'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/lib/auth';
import { FOOTER_QUICK_LINKS } from '../../model/constants';
import { FOOTER_TITLES } from '../../model/messages';
import { LABELS } from '../../model/messages';

export function FooterQuickMenuLinks() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    // 프로필 링크인 경우 동적 처리
    if (label === LABELS.NAV.PROFILE) {
      e.preventDefault();
      if (isLoading) return;
      
      if (isLoggedIn) {
        router.push('/mypage');
      } else {
        router.push('/auth/login');
      }
    }
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-4)]">
      <h3 className="text-heading-4 text-[var(--color-text-inverse)]">{FOOTER_TITLES.QUICK_LINKS}</h3>
      <ul className="flex flex-col gap-[var(--spacing-2)]">
        {FOOTER_QUICK_LINKS.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              onClick={(e) => handleLinkClick(e, label)}
              className="group flex items-center gap-[var(--spacing-2)] text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-inverse)]"
              aria-label={label === LABELS.NAV.PROFILE && isLoading ? '로딩 중...' : label}
            >
              <Icon
                className="h-[var(--spacing-4)] w-[var(--spacing-4)] transition-transform duration-200 group-hover:scale-110"
                aria-hidden
              />
              <span className="text-body-small">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
