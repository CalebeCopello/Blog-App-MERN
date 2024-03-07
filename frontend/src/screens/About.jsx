const About = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className='max-w-2xl mx-auto p-3 text-center'>
				<div>
					<h1 className='text-3xl font-semibold text-center my-7'>
						{"Calebe's Blog"}
					</h1>
					<div className='text-md text-gray3_lm dark:text-gray3_dm flex flex-col gap-6'>
						<p>
							{
								"O Calebe's Blog é um espaço que criei para compartilhar meus pensamentos e insights com o mundo. Como estudante de programação, vejo grande importância em registrar minhas experiências, tanto para organizá-las melhor quanto para receber feedback de outras pessoas. Espero que apreciem o conteúdo que encontrarão aqui."
							}
						</p>
						<p>
							{
								'Neste blog, serão publicados artigos semanais que abordam minhas experiências como desenvolvedor web.'
							}
						</p>
						<p>
							{
								'Agradeço se puderem deixar um comentário sempre que possível, pois isso nos permite discutir ideias e progredir em nosso desenvolvimento. Juntos, podemos nos ajudar e crescer ainda mais.'
							}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
