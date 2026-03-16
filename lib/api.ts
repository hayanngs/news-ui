// ─────────────────────────────────────────────
// lib/api.ts — versão com mocks completos
// ─────────────────────────────────────────────

import { Noticia, Pessoa, PaginaEstatica } from "@/types"

const API_URL = process.env.API_URL || "http://localhost:8080"

// ══════════════════════════════════════════════
// MOCKS
// ══════════════════════════════════════════════

const NOTICIAS_MOCK: Noticia[] = [

  // ── POLÍTICA ──────────────────────────────
  {
    id: 1,
    titulo: "Governo anuncia novo programa de habitação popular em Goiás",
    slug: "governo-anuncia-programa-habitacao-popular-goias",
    resumo: "Iniciativa prevê construção de 500 mil unidades habitacionais até 2026 em regiões metropolitanas do estado.",
    conteudo: `<p>O governo estadual anunciou nesta segunda-feira um ambicioso programa de habitação popular que prevê a construção de 500 mil unidades habitacionais até o final de 2026.</p><p>O programa, batizado de <strong>Casa Goiás</strong>, terá investimento total de R$ 45 bilhões e vai priorizar famílias com renda mensal de até três salários mínimos nas regiões metropolitanas de Goiânia e Aparecida de Goiânia.</p><blockquote>Este é o maior investimento em habitação da história do estado, declarou o governador durante a coletiva de imprensa realizada no Palácio das Esmeraldas.</blockquote><p>As inscrições começam no próximo mês pelo aplicativo oficial do governo. A expectativa é beneficiar mais de 1,5 milhão de pessoas até o fim do programa.</p><p>Segundo o secretário de Habitação, os recursos virão de uma combinação entre verbas estaduais, federais e financiamentos junto à Caixa Econômica Federal. Os empreendimentos serão construídos em 18 municípios goianos.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    categoria: "Política",
    autor: "Ana Souza",
    publicadoEm: "2025-03-10T09:00:00",
    publicado: true,
    destaque: true,
  },
  {
    id: 2,
    titulo: "Assembleia Legislativa aprova orçamento de R$ 28 bilhões para 2026",
    slug: "assembleia-aprova-orcamento-2026",
    resumo: "Votação foi aprovada por 32 votos a 9. Saúde e educação recebem maior fatia dos recursos.",
    conteudo: `<p>A Assembleia Legislativa de Goiás aprovou nesta terça-feira, em segundo turno, o Projeto de Lei Orçamentária Anual (LOA) para 2026, no valor de R$ 28,4 bilhões.</p><p>O orçamento destina 35% dos recursos para a área de saúde e 28% para educação, refletindo as prioridades do governo estadual para o próximo exercício fiscal.</p><p>A votação foi aprovada por 32 votos a favor e 9 contrários, com 2 abstenções. A oposição criticou o que chamou de "subestimativa de receitas" e alertou para o risco de déficit fiscal.</p><blockquote>Aprovamos um orçamento responsável, que garante investimentos sem comprometer o equilíbrio das contas públicas, afirmou o líder do governo na casa.</blockquote>`,
    imagemUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    categoria: "Política",
    autor: "Carlos Lima",
    publicadoEm: "2025-03-09T11:30:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 3,
    titulo: "Prefeitura de Goiânia lança plano de mobilidade urbana para 2030",
    slug: "prefeitura-goiania-plano-mobilidade-2030",
    resumo: "Projeto prevê expansão do metrô, novos corredores de BRT e 200 km de ciclovias até o final da década.",
    conteudo: `<p>A Prefeitura de Goiânia apresentou nesta quarta-feira o Plano de Mobilidade Urbana 2025-2030, um conjunto de ações que visa transformar o transporte público da capital goiana.</p><p>Entre as principais medidas estão a expansão da linha do metrô até o Setor Bueno, a criação de três novos corredores de BRT nas avenidas mais movimentadas e a implantação de 200 quilômetros de ciclovias integradas.</p><p>O investimento total previsto é de R$ 4,2 bilhões, sendo R$ 1,8 bilhão proveniente do governo federal por meio do Programa de Aceleração do Crescimento (PAC).</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    categoria: "Política",
    autor: "Maria Santos",
    publicadoEm: "2025-03-08T08:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 4,
    titulo: "Senado aprova reforma tributária com impacto direto em Goiás",
    slug: "senado-aprova-reforma-tributaria-impacto-goias",
    resumo: "Estado poderá perder até R$ 3 bilhões em arrecadação nos próximos cinco anos, segundo estimativas da Sefaz.",
    conteudo: `<p>O Senado Federal concluiu a votação da reforma tributária com aprovação por 68 votos a 12. Para Goiás, as mudanças devem ter impacto significativo na arrecadação estadual.</p><p>Segundo a Secretaria de Estado da Fazenda (Sefaz-GO), o estado pode registrar queda de até R$ 3 bilhões em receitas nos próximos cinco anos por conta da unificação dos tributos e das regras de transição.</p><p>O governo goiano já anunciou que vai acionar o Supremo Tribunal Federal para questionar pontos da reforma que considera prejudiciais aos estados produtores do agronegócio.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&q=80",
    categoria: "Política",
    autor: "Ana Souza",
    publicadoEm: "2025-03-07T14:00:00",
    publicado: true,
    destaque: false,
  },

  // ── ECONOMIA ──────────────────────────────
  {
    id: 5,
    titulo: "Banco Central reduz taxa de juros pela terceira vez consecutiva",
    slug: "banco-central-reduz-taxa-juros",
    resumo: "Decisão unânime do Copom leva a Selic a 10,5% ao ano, menor patamar em dois anos.",
    conteudo: `<p>O Comitê de Política Monetária (Copom) decidiu por unanimidade reduzir a taxa Selic em 0,5 ponto percentual, levando-a para 10,5% ao ano. Esta é a terceira redução consecutiva e representa o menor patamar da taxa básica de juros em dois anos.</p><p>A decisão foi bem recebida pelos mercados. O Ibovespa fechou em alta de 1,8% e o dólar recuou frente ao real, encerrando o dia cotado a R$ 4,85.</p><blockquote>A trajetória de desinflação permite este ciclo de afrouxamento monetário, mas seguiremos dependentes dos dados para as próximas reuniões, afirmou o presidente do BC em entrevista coletiva.</blockquote><p>Economistas consultados pelo portal projetam mais dois cortes de 0,5 ponto até o final do ano, o que levaria a Selic para 9,5% ao ano.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    categoria: "Economia",
    autor: "Carlos Lima",
    publicadoEm: "2025-03-09T14:30:00",
    publicado: true,
    destaque: true,
  },
  {
    id: 6,
    titulo: "Agronegócio goiano bate recorde de exportações no primeiro trimestre",
    slug: "agronegocio-goiano-recorde-exportacoes",
    resumo: "Soja, milho e carne bovina puxaram crescimento de 18% nas vendas externas em relação ao mesmo período do ano passado.",
    conteudo: `<p>O agronegócio de Goiás registrou o melhor resultado histórico de exportações no primeiro trimestre de 2025, com US$ 4,2 bilhões em produtos comercializados com o exterior.</p><p>O crescimento de 18% em relação ao mesmo período do ano anterior foi impulsionado principalmente pela soja, que respondeu por 42% do total exportado, seguida pelo milho (23%) e pela carne bovina (18%).</p><p>A China continua sendo o principal destino das exportações goianas, absorvendo 38% do total. Estados Unidos e União Europeia aparecem em segundo e terceiro lugares.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    categoria: "Economia",
    autor: "Carlos Lima",
    publicadoEm: "2025-03-06T10:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 7,
    titulo: "Desemprego em Goiás cai para 6,2% e atinge menor nível histórico",
    slug: "desemprego-goias-cai-menor-nivel",
    resumo: "Dado da PNAD Contínua mostra que estado tem a segunda menor taxa de desocupação do Centro-Oeste.",
    conteudo: `<p>A taxa de desemprego em Goiás recuou para 6,2% no quarto trimestre de 2024, menor nível já registrado pelo IBGE para o estado desde o início da série histórica em 2012.</p><p>O resultado coloca Goiás como o segundo estado do Centro-Oeste com menor desocupação, atrás apenas do Mato Grosso (5,8%). A média nacional ficou em 7,4%.</p><p>Os setores que mais criaram vagas foram o agronegócio, a construção civil e o comércio varejista. O emprego formal cresceu 4,3% no período.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    categoria: "Economia",
    autor: "Ana Souza",
    publicadoEm: "2025-03-05T09:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 8,
    titulo: "Startup goiana capta R$ 120 milhões para expandir tecnologia no agro",
    slug: "startup-goiana-capta-120-milhoes-agro",
    resumo: "Empresa de Anápolis desenvolve solução de monitoramento de lavouras por satélite e já atua em 8 estados.",
    conteudo: `<p>A AgroSat, startup fundada em Anápolis em 2020, anunciou a captação de R$ 120 milhões em uma rodada Série B liderada por fundos nacionais e internacionais de venture capital.</p><p>A empresa desenvolve plataformas de monitoramento de lavouras por imagens de satélite e inteligência artificial, permitindo que produtores rurais acompanhem em tempo real o desenvolvimento das culturas e prevejam riscos climáticos.</p><p>Com o novo aporte, a AgroSat planeja expandir sua atuação dos atuais 8 estados para todos os estados produtores do Brasil até o final de 2026, além de iniciar operações no Paraguai e na Argentina.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    categoria: "Economia",
    autor: "Pedro Alves",
    publicadoEm: "2025-03-04T11:00:00",
    publicado: true,
    destaque: false,
  },

  // ── ESPORTE ───────────────────────────────
  {
    id: 9,
    titulo: "Goiás vence o Atlético-MG de virada e avança na Copa do Brasil",
    slug: "goias-vence-atletico-mg-copa-brasil",
    resumo: "Esmeraldino virou o jogo nos acréscimos com dois gols de Alesson e garantiu vaga nas oitavas de final.",
    conteudo: `<p>Em uma noite épica no Serrinha, o Goiás Esporte Clube virou o jogo contra o Atlético Mineiro por 2 a 1 nos acréscimos e garantiu sua classificação para as oitavas de final da Copa do Brasil.</p><p>O Galo abriu o placar no primeiro tempo com gol de Hulk de pênalti. No segundo tempo, o Goiás pressionou e Alesson empatou aos 38 minutos e marcou o gol da virada aos 47, desencadeando uma festa no estádio.</p><blockquote>A gente nunca desistiu. O Serrinha foi fundamental, a torcida empurrou o time até o fim, declarou o técnico Márcio Zanardi após a partida.</blockquote><p>Nas oitavas, o Esmeraldino vai enfrentar o Fluminense. O jogo de ida será no Maracanã na próxima quinzena.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    categoria: "Esporte",
    autor: "Pedro Alves",
    publicadoEm: "2025-03-10T22:30:00",
    publicado: true,
    destaque: true,
  },
  {
    id: 10,
    titulo: "Atlético Goianiense anuncia contratação de atacante uruguaio",
    slug: "atletico-goianiense-contratacao-atacante-uruguaio",
    resumo: "Rodrigo Bentancourt, 26 anos, chega por empréstimo do Nacional de Montevidéu até dezembro de 2025.",
    conteudo: `<p>O Atlético Clube Goianiense confirmou nesta quinta-feira a contratação do atacante uruguaio Rodrigo Bentancourt, 26 anos, por empréstimo do Club Nacional de Football até o final de 2025.</p><p>Bentancourt se destacou no último Campeonato Uruguaio marcando 14 gols em 22 jogos. O jogador chega para reforçar o setor ofensivo do Dragão, que sofreu com a saída do centroavante titular no início da temporada.</p><p>O atleta passa por exames médicos nesta sexta-feira e já poderá ser relacionado para o próximo jogo do Brasileirão, marcado para o domingo.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800&q=80",
    categoria: "Esporte",
    autor: "Pedro Alves",
    publicadoEm: "2025-03-08T16:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 11,
    titulo: "Atleta goiana conquista ouro no Pan-Americano de natação",
    slug: "atleta-goiana-ouro-pan-americano-natacao",
    resumo: "Isabela Ferreira, 19 anos, de Goiânia, quebrou o recorde pan-americano nos 200m borboleta.",
    conteudo: `<p>A nadadora goiana Isabela Ferreira, 19 anos, conquistou a medalha de ouro nos 200 metros borboleta no Campeonato Pan-Americano de Natação realizado em Lima, no Peru.</p><p>A atleta, nascida em Goiânia e formada no projeto social Águas Claras, terminou a prova em 2min04s32, estabelecendo novo recorde pan-americano e quebrando a marca anterior que durava desde 2018.</p><p>Isabela já tem vaga garantida nos Jogos Olímpicos de Los Angeles 2028 e mira agora o Mundial de Esportes Aquáticos, que acontece em julho na Singapura.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
    categoria: "Esporte",
    autor: "Ana Souza",
    publicadoEm: "2025-03-07T19:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 12,
    titulo: "Goiânia confirma sede de jogos da Copa América Feminina 2026",
    slug: "goiania-sede-copa-america-feminina-2026",
    resumo: "Estádio Serra Dourada passará por reforma de R$ 85 milhões para receber ao menos 4 partidas do torneio.",
    conteudo: `<p>A Confederação Sul-Americana de Futebol (Conmebol) confirmou oficialmente Goiânia como uma das sedes da Copa América Feminina 2026. O Serra Dourada receberá ao menos quatro partidas, incluindo uma semifinal.</p><p>Para sediar o torneio, o estádio passará por uma reforma de R$ 85 milhões, com melhorias na iluminação, gramado, vestiários e acessibilidade. As obras começam em setembro e têm previsão de conclusão para março de 2026.</p><p>A Copa América Feminina 2026 será disputada em seis cidades brasileiras entre maio e junho daquele ano. As outras sedes confirmadas são São Paulo, Rio de Janeiro, Belo Horizonte, Fortaleza e Porto Alegre.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80",
    categoria: "Esporte",
    autor: "Carlos Lima",
    publicadoEm: "2025-03-05T10:00:00",
    publicado: true,
    destaque: false,
  },

  // ── ENTRETENIMENTO ────────────────────────
  {
    id: 13,
    titulo: "Festival de música de Goiânia anuncia line-up com Ivete Sangalo e Criolo",
    slug: "festival-musica-goiania-lineup-ivete-criolo",
    resumo: "FestGoiânia 2025 acontece em junho no Parque Vaca Brava e espera reunir 80 mil pessoas nos três dias de evento.",
    conteudo: `<p>Os organizadores do FestGoiânia 2025 divulgaram nesta semana o line-up completo da edição deste ano, que acontece de 13 a 15 de junho no Parque Vaca Brava, na capital goiana.</p><p>Os headliners confirmados são Ivete Sangalo (sexta-feira), Criolo (sábado) e Seu Jorge (domingo). A programação completa conta com mais 32 atrações distribuídas em quatro palcos.</p><p>Entre as atrações regionais, destaque para o grupo de forró eletrônico Forró Real, a cantora goiana Tainá Müller e a banda de rock alternativo Cerrado Sessions, que faz sua primeira apresentação no festival.</p><p>Os ingressos estão disponíveis no site oficial e em pontos de venda espalhados pela cidade. O passaporte para os três dias custa R$ 380 na segunda lote.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    categoria: "Entretenimento",
    autor: "Maria Santos",
    publicadoEm: "2025-03-10T12:00:00",
    publicado: true,
    destaque: true,
  },
  {
    id: 14,
    titulo: "Série brasileira gravada em Goiás estreia na Netflix e entra no top 10 mundial",
    slug: "serie-brasileira-goias-netflix-top-10",
    resumo: "Produção ambientada no cerrado goiano chegou à plataforma na última sexta e já acumula 12 milhões de visualizações.",
    conteudo: `<p>A série "Cerrado", produção brasileira filmada integralmente em Goiás, estreou na Netflix na última sexta-feira e rapidamente entrou no top 10 de séries mais assistidas da plataforma em 14 países.</p><p>A trama acompanha a história de uma família de agricultores do interior goiano que descobre um segredo enterrado nas terras da fazenda por gerações. Com oito episódios, a série foi rodada ao longo de quatro meses em locações como a Chapada dos Veadeiros, a cidade de Pirenópolis e o centro histórico de Goiás Velho.</p><p>A produção gerou mais de 200 empregos diretos no estado durante as filmagens e já garantiu uma segunda temporada, que começa a ser gravada em agosto.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    categoria: "Entretenimento",
    autor: "Pedro Alves",
    publicadoEm: "2025-03-09T09:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 15,
    titulo: "Museu de Arte de Goiânia reabre após reforma com exposição inédita",
    slug: "museu-arte-goiania-reabre-exposicao",
    resumo: "MAG passa por ampliação de 2.400 m² e inaugura mostra sobre arte contemporânea do cerrado com 80 obras.",
    conteudo: `<p>O Museu de Arte de Goiânia (MAG) reabriu suas portas neste sábado após 18 meses de obras de reforma e ampliação. O espaço ganhou 2.400 metros quadrados de área expositiva e um auditório com capacidade para 300 pessoas.</p><p>A reabertura é celebrada com a exposição "Cerrado Vivo", que reúne 80 obras de artistas contemporâneos de Goiás, Mato Grosso e Tocantins. A mostra explora as relações entre arte, natureza e cultura do bioma cerrado.</p><p>A entrada é gratuita nos primeiros 30 dias. O museu funcionará de terça a domingo, das 9h às 18h. Visitas guiadas acontecem às quartas e sábados às 10h e 15h.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1565060169194-19fabf63012c?w=800&q=80",
    categoria: "Entretenimento",
    autor: "Ana Souza",
    publicadoEm: "2025-03-08T10:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 16,
    titulo: "Peça teatral goiana ganha prêmio nacional e vai se apresentar em 10 cidades",
    slug: "peca-teatral-goiana-premio-nacional",
    resumo: "Espetáculo 'Raízes do Sertão', do grupo Companhia Anhanguera, venceu o Prêmio FUNARTE de Teatro 2025.",
    conteudo: `<p>A peça "Raízes do Sertão", da Companhia Anhanguera de Teatro, sediada em Goiânia, venceu o Prêmio FUNARTE de Teatro 2025 na categoria melhor espetáculo adulto.</p><p>O espetáculo, que retrata a história de migrantes nordestinos que se estabeleceram no cerrado goiano no século XX, conquistou também os prêmios de melhor direção, melhor cenografia e melhor trilha sonora original.</p><p>Com o prêmio, a companhia vai realizar uma turnê nacional passando por São Paulo, Rio de Janeiro, Salvador, Recife, Fortaleza, Belém, Manaus, Curitiba, Porto Alegre e Brasília entre maio e outubro deste ano.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
    categoria: "Entretenimento",
    autor: "Maria Santos",
    publicadoEm: "2025-03-06T14:00:00",
    publicado: true,
    destaque: false,
  },

  // ── SEGURANÇA ─────────────────────────────
  {
    id: 17,
    titulo: "Operação desmantela esquema de tráfico de drogas em Aparecida de Goiânia",
    slug: "operacao-desmantela-trafico-aparecida-goiania",
    resumo: "Polícia Civil prendeu 12 suspeitos e apreendeu mais de 200 kg de entorpecentes durante ação que durou 48 horas.",
    conteudo: `<p>A Polícia Civil de Goiás deflagrou nesta madrugada a Operação Barreira, que resultou na prisão de 12 pessoas suspeitas de integrar uma organização criminosa voltada ao tráfico de entorpecentes em Aparecida de Goiânia.</p><p>Durante a operação, que mobilizou 80 policiais ao longo de 48 horas, foram apreendidos 210 kg de cocaína, 85 kg de maconha, R$ 340 mil em espécie, 15 armas de fogo e 8 veículos utilizados pela quadrilha.</p><p>Segundo o delegado responsável pela investigação, a organização movimentava cerca de R$ 2 milhões por mês e atuava em pelo menos 6 bairros do município. O inquérito tramitou em sigilo por quatro meses antes do cumprimento dos mandados.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    categoria: "Segurança",
    autor: "Carlos Lima",
    publicadoEm: "2025-03-10T06:00:00",
    publicado: true,
    destaque: true,
  },
  {
    id: 18,
    titulo: "Goiás registra queda de 14% nos homicídios no primeiro bimestre de 2025",
    slug: "goias-queda-homicidios-primeiro-bimestre",
    resumo: "Dados da SSP mostram que estado saiu de 312 para 268 mortes violentas em comparação com o mesmo período de 2024.",
    conteudo: `<p>A Secretaria de Segurança Pública de Goiás (SSP-GO) divulgou nesta semana os dados de criminalidade referentes ao primeiro bimestre de 2025, que mostram queda de 14% nos homicídios dolosos em relação ao mesmo período do ano anterior.</p><p>Foram registradas 268 mortes violentas intencionais entre janeiro e fevereiro, contra 312 no mesmo período de 2024. A redução é atribuída às operações integradas entre a Polícia Civil e a Polícia Militar, além da implementação do programa de monitoramento por câmeras em áreas de maior incidência criminal.</p><p>Apesar da melhora nos homicídios, os roubos a veículos cresceram 8% no período, o que a SSP classifica como "preocupante" e já motivou o reforço de efetivo nas principais rodovias do estado.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=800&q=80",
    categoria: "Segurança",
    autor: "Maria Santos",
    publicadoEm: "2025-03-07T10:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 19,
    titulo: "PM lança programa de policiamento comunitário em 20 bairros de Goiânia",
    slug: "pm-policiamento-comunitario-goiania",
    resumo: "Iniciativa vai colocar 150 policiais em contato direto com moradores para prevenção de crimes e resolução de conflitos.",
    conteudo: `<p>A Polícia Militar de Goiás lançou nesta semana o programa "PM na Comunidade", que vai posicionar 150 policiais militares em contato direto e permanente com moradores de 20 bairros da capital goiana.</p><p>Os policiais designados para o programa vão realizar reuniões mensais com associações de moradores, acompanhar demandas locais de segurança e desenvolver ações de prevenção voltadas para jovens em situação de vulnerabilidade.</p><p>O programa segue modelo adotado com sucesso em São Paulo e Rio de Janeiro e será avaliado trimestralmente com base em indicadores de redução de ocorrências, satisfação da população e engajamento comunitário.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80",
    categoria: "Segurança",
    autor: "Pedro Alves",
    publicadoEm: "2025-03-05T08:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 20,
    titulo: "Fraude milionária em licitação é descoberta pela CGM de Goiânia",
    slug: "fraude-licitacao-cgm-goiania",
    resumo: "Auditoria identificou superfaturamento de R$ 4,2 milhões em contratos de reforma de escolas municipais.",
    conteudo: `<p>A Controladoria-Geral do Município de Goiânia (CGM) identificou um esquema de superfaturamento em contratos de reforma de unidades escolares da rede municipal que causou prejuízo estimado de R$ 4,2 milhões aos cofres públicos.</p><p>Segundo o relatório de auditoria, empresas contratadas cobraram valores até 180% acima dos preços de mercado por serviços de pintura, hidráulica e elétrica em 23 escolas municipais entre 2023 e 2024.</p><p>A CGM já encaminhou o caso ao Ministério Público de Goiás e à Polícia Civil para investigação. Três servidores que assinaram os atestes de serviços foram afastados preventivamente enquanto o inquérito tramita.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    categoria: "Segurança",
    autor: "Ana Souza",
    publicadoEm: "2025-03-04T09:30:00",
    publicado: true,
    destaque: false,
  },

  // ── ÚLTIMAS / GERAIS ──────────────────────
  {
    id: 21,
    titulo: "STF decide sobre direito à desconexão digital no trabalho remoto",
    slug: "stf-decide-direito-desconexao-digital",
    resumo: "Decisão histórica pode beneficiar mais de 20 milhões de trabalhadores em regime de home office no país.",
    conteudo: `<p>O Supremo Tribunal Federal concluiu o julgamento que estabelece o direito à desconexão digital como um direito fundamental dos trabalhadores em regime remoto.</p><p>A decisão, aprovada por 8 votos a 3, determina que empresas não podem exigir disponibilidade de funcionários fora do horário contratual e devem pagar adicional quando isso ocorrer — equivalente ao adicional noturno, de 20% sobre a hora regular.</p><p>A ministra relatora destacou que o Brasil é um dos países com maior jornada de trabalho efetiva do mundo e que a pandemia agravou o problema da hiperconectividade.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    categoria: "Política",
    autor: "Maria Santos",
    publicadoEm: "2025-03-08T11:15:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 22,
    titulo: "Chapada dos Veadeiros recebe certificação de parque mais sustentável do Brasil",
    slug: "chapada-veadeiros-certificacao-sustentavel",
    resumo: "Reconhecimento internacional destaca práticas de conservação e turismo responsável na unidade de conservação goiana.",
    conteudo: `<p>O Parque Nacional da Chapada dos Veadeiros recebeu nesta semana o certificado de Parque Nacional mais sustentável do Brasil, concedido pelo Conselho Internacional de Áreas Protegidas (IUCN).</p><p>O reconhecimento leva em conta critérios como gestão de resíduos, controle de visitação, envolvimento das comunidades do entorno e programas de restauração de áreas degradadas.</p><p>O parque, localizado no nordeste de Goiás, abriga mais de 2.600 espécies de plantas e 800 de animais vertebrados, sendo um dos maiores repositórios de biodiversidade do cerrado.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    categoria: "Entretenimento",
    autor: "Pedro Alves",
    publicadoEm: "2025-03-06T08:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 23,
    titulo: "Universidade Federal de Goiás abre 1.200 vagas em novos cursos de graduação",
    slug: "ufg-abre-vagas-novos-cursos",
    resumo: "Instituição vai criar cursos de Engenharia de Dados, Medicina Veterinária e Fisioterapia em novas unidades regionais.",
    conteudo: `<p>A Universidade Federal de Goiás (UFG) anunciou a criação de 1.200 novas vagas em cursos de graduação a partir do segundo semestre de 2025. As vagas fazem parte do programa de expansão aprovado pelo MEC no final do ano passado.</p><p>Entre os novos cursos estão Engenharia de Dados (no campus Goiânia), Medicina Veterinária (campus Jataí ampliado) e Fisioterapia (novo campus em Formosa). A UFG também vai ampliar as vagas em Medicina, com 40 novas vagas no curso já existente.</p><p>As vagas serão preenchidas por meio do SISU, com notas do ENEM 2025. As inscrições acontecem no primeiro semestre do próximo ano letivo.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    categoria: "Política",
    autor: "Ana Souza",
    publicadoEm: "2025-03-03T10:00:00",
    publicado: true,
    destaque: false,
  },
  {
    id: 24,
    titulo: "Saúde: Goiás amplia programa de cirurgias eletivas e zera fila em 12 municípios",
    slug: "goias-amplia-cirurgias-eletivas-zera-fila",
    resumo: "Estado realizou 48 mil procedimentos cirúrgicos em mutirão que durou 90 dias, reduzindo em 60% a lista de espera geral.",
    conteudo: `<p>O governo de Goiás anunciou o encerramento do mutirão de cirurgias eletivas que durou 90 dias e resultou na realização de 48 mil procedimentos em 140 municípios goianos.</p><p>Em 12 cidades do interior, a fila de espera foi completamente zerada. No estado como um todo, a lista de espera por cirurgias eletivas foi reduzida em 60%, saindo de 120 mil para 48 mil pacientes aguardando procedimento.</p><p>As especialidades com maior volume de atendimentos foram ortopedia (17 mil cirurgias), oftalmologia (12 mil) e otorrinolaringologia (8 mil). O próximo mutirão está previsto para começar em julho.</p>`,
    imagemUrl: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
    categoria: "Política",
    autor: "Carlos Lima",
    publicadoEm: "2025-03-02T08:00:00",
    publicado: true,
    destaque: false,
  },
]

const PESSOAS_MOCK: Pessoa[] = [
  { id: 1, nome: "Ana Souza", cargo: "Editora-chefe", bio: "15 anos de experiência em jornalismo político e investigativo. Ex-correspondente internacional pela América Latina.", fotoUrl: "", email: "ana@portal.com.br", linkedin: "" },
  { id: 2, nome: "Carlos Lima", cargo: "Editor de Economia", bio: "Especializado em cobertura econômica e mercado financeiro. MBA em Finanças pela FGV e ex-repórter do Valor Econômico.", fotoUrl: "", email: "carlos@portal.com.br", linkedin: "" },
  { id: 3, nome: "Maria Santos", cargo: "Jornalista", bio: "Cobre pautas sociais, direitos humanos e políticas públicas há 8 anos. Prêmio Vladimir Herzog de Anistia e Direitos Humanos 2022.", fotoUrl: "", email: "maria@portal.com.br", linkedin: "" },
  { id: 4, nome: "Pedro Alves", cargo: "Repórter Multimídia", bio: "Fotojornalista e repórter. Especializado em cultura, meio ambiente e esporte. Fotógrafo oficial do Goiás Esporte Clube por 3 anos.", fotoUrl: "", email: "pedro@portal.com.br", linkedin: "" },
]

// ══════════════════════════════════════════════
// FUNÇÕES DE ACESSO
// ══════════════════════════════════════════════

async function fetchComFallback<T>(url: string, fallback: T, opcoes?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, { ...opcoes, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  } catch {
    return fallback
  }
}

export async function getUltimasNoticias(pagina = 0, tamanho = 12) {
  const inicio = pagina * tamanho
  const fallback = {
    noticias: NOTICIAS_MOCK.slice(inicio, inicio + tamanho),
    totalPaginas: Math.ceil(NOTICIAS_MOCK.length / tamanho),
    totalElementos: NOTICIAS_MOCK.length,
  }
  try {
    const res = await fetch(`${API_URL}/api/noticias?page=${pagina}&size=${tamanho}&sort=publicadoEm,desc`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return { noticias: data.content, totalPaginas: data.totalPages, totalElementos: data.totalElements }
  } catch {
    return fallback
  }
}

/**
 * Retorna as notícias mais lidas.
 * Por enquanto retorna as primeiras 5 do mock (sempre fixas).
 * Quando o backend estiver pronto, trocar pela chamada:
 * GET /api/noticias/mais-lidas?size=5
 */
export async function getMaisLidas(): Promise<Noticia[]> {
  const fallback = NOTICIAS_MOCK.slice(0, 5)
  try {
    const res = await fetch(
      `${API_URL}/api/noticias/mais-lidas?size=5`,
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(3000) }
    )
    if (!res.ok) throw new Error()
    return res.json()
  } catch {
    return fallback
  }
}
 

export async function getNoticiasDestaque(): Promise<Noticia[]> {
  const fallback = NOTICIAS_MOCK.filter(n => n.destaque).slice(0, 4)
  try {
    const res = await fetch(`${API_URL}/api/noticias?destaque=true&size=4`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.content?.length ? data.content : fallback
  } catch {
    return fallback
  }
}

export async function getNoticia(slug: string): Promise<Noticia> {
  const fallback = NOTICIAS_MOCK.find(n => n.slug === slug)
  if (!fallback) throw new Error(`Notícia não encontrada: ${slug}`)
  try {
    const res = await fetch(`${API_URL}/api/noticias/${slug}`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    return res.json()
  } catch {
    return fallback
  }
}

export async function getNoticiasPorCategoria(categoria: string): Promise<Noticia[]> {
  const fallback = NOTICIAS_MOCK.filter(n => n.categoria === categoria)
  try {
    const res = await fetch(`${API_URL}/api/noticias?categoria=${encodeURIComponent(categoria)}&size=20`, { next: { revalidate: 120 }, signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.content?.length ? data.content : fallback
  } catch {
    return fallback
  }
}

export async function getTodosOsslugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/noticias/slugs`, { cache: "no-store", signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error()
    return res.json()
  } catch {
    return NOTICIAS_MOCK.map(n => n.slug)
  }
}

export async function getPessoas(): Promise<Pessoa[]> {
  return fetchComFallback(`${API_URL}/api/pessoas`, PESSOAS_MOCK, { next: { revalidate: 3600 } })
}

export async function getPaginaEstatica(pagina: "sobre" | "direitos"): Promise<PaginaEstatica> {
  const res = await fetch(`${API_URL}/api/paginas/${pagina}`, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000) })
  if (!res.ok) throw new Error(`Página não encontrada: ${pagina}`)
  return res.json()
}