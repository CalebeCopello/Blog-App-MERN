import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'

const FooterComponent = () => {
	return (
		<Footer
			container
			className='border border-t-8 border-orange0 bg-bg1_lm dark:bg-bg2_dm'
		>
			<div className='w-full max-w-7xl mx-auto'>
				<div className='grid w-full justify-between sm:flex md:grid-cols-1'>
					<div className='mt-5'>
						<Link
							to='/'
							className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold font-JetBrainsMono dark:text-fg0_lm:'
						>
							<span className='px-2 py-1 bg-orange0 rounded-lg text-fg0_dm shadow-md'>
								Calebe&#39;s
							</span>
							Blog
						</Link>
					</div>
					<div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-2 sm:gap-6'>
						<div>
							<Footer.Title
								title='Sobre'
								className='text-orange1_lm dark:text-orange1_dm'
							/>
							<Footer.LinkGroup
								col
								className='text-fg0_lm dark:text-fg0_dm'
							>
								<Footer.Link
									href='http://www.calebecopello.com'
									target='_blank'
									rel='noopener noreferrer'
								>
									Calebe Copello
								</Footer.Link>
								<Footer.Link
									href='/about'
									target='_blank'
									rel='noopener noreferrer'
								>
									{"Calebe's Blog"}
								</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title
								title='Nos Siga'
								className='text-orange1_lm dark:text-orange1_dm'
							/>
							<Footer.LinkGroup
								col
								className='text-fg0_lm dark:text-fg0_dm'
							>
								<Footer.Link
									href='http://www.github.com/calebecopello'
									target='_blank'
									rel='noopener noreferrer'
								>
									GitHub
								</Footer.Link>
								<Footer.Link
									href='https://www.linkedin.com/in/calebe-copello-59b588263/'
									target='_blank'
									rel='noopener noreferrer'
								>
									LinkedIn
								</Footer.Link>
							</Footer.LinkGroup>
						</div>
					</div>
				</div>
				<Footer.Divider />
				<div className=''>
					<Footer.Copyright
						by='Calebe Copello'
						year={new Date().getFullYear()}
					/>
				</div>
			</div>
		</Footer>
	)
}

export default FooterComponent
