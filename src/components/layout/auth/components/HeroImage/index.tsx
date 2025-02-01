import { Logo } from '@/components';

export function AuthHeroImage() {
	return (
		<div className="relative hidden h-screen flex-col bg-muted p-10 text-white lg:flex dark:border-r">
			<div className="absolute inset-0 bg-zinc-900 max-h-screen bg-[url('/assets/images/bg/auth.jpg')] bg-cover" />
			<div className="relative z-20 flex items-center text-lg font-medium">
				<Logo />
			</div>
			<div className="relative z-20 mt-auto">
				<blockquote className="space-y-2">
					<p className="text-lg" />
					<footer className="text-sm">kloud team</footer>
				</blockquote>
			</div>
		</div>
	);
}
