'use client';

import { useState } from 'react';
import { Brand } from '../Brand/Brand';
import { NavMenu } from '../NavMenu/NavMenu';
import { MobileNavMenu } from '../MobileNavMenu/MobileNavMenu';
import { ProfileButton } from '../ProfileButton/ProfileButton';
import { HamburgerMenu } from '../HamburgerMenu/HamburgerMenu';
import type { NavMenuProps } from '../../model/types';

export function Header({ active, onSelect }: NavMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative bg-[var(--color-background)]/90 backdrop-blur-md shadow-[var(--shadow-brand-md)] border-b border-[var(--color-border)] sticky top-0 z-[var(--z-sticky)]">
      <div className="max-w-7xl mx-auto px-container-padding sm:px-container-padding-tablet lg:px-container-padding-desktop lg:px-[var(--spacing-8)]">
        <div className="flex justify-between items-center h-[var(--spacing-20)]">
          <Brand />
          <NavMenu active={active} onSelect={onSelect} />
          <div className="flex items-center gap-[var(--spacing-2)] md:hidden">
            <HamburgerMenu
              isOpen={isMobileMenuOpen}
              onToggle={handleMobileMenuToggle}
              aria-label="메뉴"
            />
            <ProfileButton />
          </div>
          <div className="hidden md:block">
            <ProfileButton />
          </div>
        </div>
      </div>

      <MobileNavMenu
        active={active}
        onSelect={onSelect}
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      />
    </header>
  );
}
