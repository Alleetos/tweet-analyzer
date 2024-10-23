type SentimentType = "positive" | "negative" | "neutral";

interface Tweet {
  Identifier: string;
  Timestamp: string;
  Sentiment: SentimentType;
  Sentiment_Score: number;
  Content: string;
  Custom_Category: string;
  Custom_Score: number;
}

const mockTweets: Tweet[] = [
  {
    Identifier: "tweet1",
    Content:
      "haalandinho crava y crava o cara guardou duas vezes contra a eslovenia e agora e o artilheiro isolado da historia da noruega com 34 gols e apenas 24 anos nationsleague",
    Timestamp: "2024-10-10T20:13:21.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.39330461621284485,
    Custom_Category: "tristeza",
    Custom_Score: -2,
  },
  {
    Identifier: "tweet2",
    Content:
      "sim estamos ficando velhos o lamine yamal tinha apenas dois anos de idade na copa de 2010 e nao se lembra do gol do titulo da espanha marcado por iniesta eu lembro de ir ao camp nou e ver o iniesta jogar ao lado de neymar e messi ele fazia parecer facil o futebol",
    Timestamp: "2024-10-10T20:07:04.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.7117666602134705,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet3",
    Content:
      "sim estamos ficando velhos o lamine yamal tinha apenas dois anos de idade na copa de 2010 e nao se lembra do gol do titulo da espanha marcado por iniesta eu lembro de ir ao camp nou e ver o iniesta jogar ao lado de neymar e messi ele fazia parecer facil o futebol",
    Timestamp: "2024-10-10T20:01:42.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.7117666602134705,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet4",
    Content:
      "atencao estamos ao vivo pra ultima partida da ferrinha na fase de grupo da libertadores feminina  sera que a classificacao vem",
    Timestamp: "2024-10-10T19:49:21.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.8679769039154053,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet5",
    Content:
      "o cara e absurdo po 33 e contando haaland abriu o placar contra a eslovenia pela nationsleague e igualou jorgen juve como maior artilheiro da historia do pais",
    Timestamp: "2024-10-10T19:17:51.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.44195660948753357,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet6",
    Content:
      "sim estamos ficando velhos o lamine yamal tinha apenas dois anos de idade na copa de 2010 e nao se lembra do gol do titulo da espanha marcado por iniesta eu lembro de ir ao camp nou e ver o iniesta jogar ao lado de neymar e messi ele fazia parecer facil o futebol",
    Timestamp: "2024-10-10T20:07:04.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.7117666602134705,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet7",
    Content:
      "sim estamos ficando velhos o lamine yamal tinha apenas dois anos de idade na copa de 2010 e nao se lembra do gol do titulo da espanha marcado por iniesta eu lembro de ir ao camp nou e ver o iniesta jogar ao lado de neymar e messi ele fazia parecer facil o futebol",
    Timestamp: "2024-10-10T20:01:42.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.7117666602134705,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet8",
    Content:
      "nunca ganharam a bola de ouro se liga no ranking que a score 90 fez com os cinco maiores jogadores que nunca ganharam a ballondor no seculo xxi baseado no auge e na longevidade de cada um deles diz ai qual desses merecia ter levado o premio",
    Timestamp: "2024-10-10T18:45:12.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.6604396104812622,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet9",
    Content:
      "simplesmente o pai meteu essa por que nao colocar vegetti no nome da sua filha ne vascaino   hahahaha po ele meteu essa serinho  seja muito bemvinda ayla veggetti  sim com direito a escrita um pouco diferente da do idolo  vasco",
    Timestamp: "2024-10-10T18:40:30.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.36697784066200256,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet10",
    Content:
      "queeeeebradeira filho o menor lancou a braba na comemoracao nao tem jeito se nao for pro meu filho vir assim o adm nem quer  mus1q",
    Timestamp: "2024-10-10T18:15:26.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.6417206525802612,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet11",
    Content:
      "voce gostaria de ganhar o pepino o que falar desse trofeu peculiar do torneio villa de leganes simplesmente o pepino dor po  o que isso ia dar o que falar aqui no brasil e brincadeira",
    Timestamp: "2024-10-10T17:27:30.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.6493628621101379,
    Custom_Category: "tristeza",
    Custom_Score: -2,
  },
  {
    Identifier: "tweet12",
    Content:
      "ele nao para r10 agora e dono de um clube norteamericano incluindo o time feminino  o greenville liberty o homem ta valorizado nos eua nao tem jeito no inicio desse mes ele foi anunciado como embaixador oficial de miami para a copadomundo de 2026",
    Timestamp: "2024-10-10T17:20:52.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.3892810046672821,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet13",
    Content:
      "craque em quadra e no campo rafael nadal anunciou sua aposentadoria hoje mas nao e so pro tenis que ele tem talento em 2008 o tenista e o goleiro iker casillas realizaram um evento beneficente onde o rafa deu trabalho ta sera que da pra migrar de esporte",
    Timestamp: "2024-10-10T15:06:26.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.5025483965873718,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet14",
    Content:
      "a selefogo ta demais e vai ter alvinegro titular hein  sera que o igor jesus vai balancar a rede pela amarelinha brasil selecaobrasileira botafogo",
    Timestamp: "2024-10-10T15:00:00.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.3645579218864441,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet15",
    Content:
      "quintou com brasil nas eliminatorias sao NOVE ANOS sem perder pro chichichilelele sera que a hegemonia verde e amarela continua   brasil selecaobrasileira eliminatorias2026",
    Timestamp: "2024-10-10T12:00:02.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.38527458906173706,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet16",
    Content:
      "esse brasil e o favorito amanha vem participar do papo10 com a gente httpsyoutubecomliveb49n86ok6_0selecaobrasileira brasil eliminatoriasdacopa",
    Timestamp: "2024-10-10T01:17:44.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.6020450592041016,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet17",
    Content:
      "mais um baile das sereias no paraguai a unica equipe brasileira classificada com 100 de aproveitamento na fase de grupos ok tem que respeitarlibertadoresfemininanacazetv futebolfeminino santos amstel",
    Timestamp: "2024-10-10T00:55:54.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.5047584772109985,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet18",
    Content:
      "e novidade que voce quer e novidade que voce vai ter  e isso mesmo voce nao esta vendo errado brasileirao 2025 e no youtube da cazetv  o campeonato brasileiro ao vivo e de graca um jogo por rodada com a nossa cara do jeito que voce aprendeu a se emocionar",
    Timestamp: "2024-10-10T00:22:59.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.4209143817424774,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet19",
    Content:
      "aaaaaaaaauuuuuutorizado o brasileirao na cazetv  sim nos fizemos de novo faremos mais historia junto com voces  brasileirao de 2025 no youtube da cazetv ao vivo e de graca um jogo por rodada com o nosso jeito unico de fazer transmissao  mal podemos esperar pra",
    Timestamp: "2024-10-10T00:22:44.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.5195131301879883,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet20",
    Content:
      "deyverson no 1deg tempo vs gremio gol treta com o marchesin discussao com o renato treta com o reinaldo entrevista marcante \n\nolha a que ele meteu saindo pro vestiario em entrevista ao premiere  brasileirao",
    Timestamp: "2024-10-09T23:43:26.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.508707582950592,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet21",
    Content:
      "elas fazem a libertadores parecer facil com gols de ju ferreira jaque e zanotti as brabas do timao se classificaram pras quartas de final da libertadoresfemininanacazetvfutebolfeminino corinthians amstel",
    Timestamp: "2024-10-09T22:30:02.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.37003564834594727,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet22",
    Content:
      "as brabas do timao estao nas quartas com a vitoria de hoje sobre o libertad o corinthians carimbou o passaporte pro matamata da libertadoresfeminina futebolfeminino corinthians",
    Timestamp: "2024-10-09T22:25:20.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.556721568107605,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet23",
    Content:
      "o vanderson pratica futebol o lateral direito do monaco e uma das novidades na selecaobrasileira e foi elogiado pelo professor dorival diz ai sera que ele tem chance como titular",
    Timestamp: "2024-10-09T21:30:01.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.4615369141101837,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet24",
    Content:
      "alguem chegou perto que ronaldo foi um fenomeno tambem com a camisa do brasil isso ninguem questiona mas e desde entao quem foi o melhor camisa 9 que a selecao ja teve selecaobrasileira",
    Timestamp: "2024-10-09T17:52:15.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.4003692865371704,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet25",
    Content:
      "abner e igor jesus no time titular no jogo contra o chile dorival ja adiantou que os dois vao estar nos 11 iniciais merecem a chance selecaobrasileira",
    Timestamp: "2024-10-09T13:26:59.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.6355598568916321,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet26",
    Content: "oieeeeeee volteiiiiiii",
    Timestamp: "2024-10-09T12:04:04.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.530135452747345,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet27",
    Content:
      "deu sono hein era o jogo mais esperado do dia mas nao empolgou ninguem city e inter nao sairam do 0 a 0 em um jogo pouco inspirado pela championsleague 1 ponto pra casa ladofutebolinternacional",
    Timestamp: "2024-09-18T21:37:36.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.7621232867240906,
    Custom_Category: "felicidade",
    Custom_Score: 3,
  },
  {
    Identifier: "tweet28",
    Content:
      "muitos gols nos jogos que voce nao viu nos principais jogos da rodada tivemos poucos gols city e inter nao sairam do 0x0 o psg buscou a vitoria contra o girona no finalzinho e o dortmund contou com a estrela de jamie gittens que saiu do banco e fez 2 gols no 2deg tempo",
    Timestamp: "2024-09-18T20:55:23.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.4917522668838501,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet29",
    Content:
      "que marra o vidal meteu essa ai depois do empate entre colocolo e river plate no duelo de ida entre os dois clubes nas quartas de final da libertadores so tem um problema a informacao nao e verdade o goleiro armani tem mais trofeus que o volante chileno 27 contra",
    Timestamp: "2024-09-18T20:22:53.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.8324890732765198,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet30",
    Content:
      "e muito gol esses sao os jogos que mais tiveram bola na rede nos ultimos 24 anos de championsleague qual foi o melhor jogo futebolinternacional",
    Timestamp: "2024-09-18T18:34:58.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.7357985377311707,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet31",
    Content:
      "cornetou o agente de futebol bruno satin comentou sobre a recente transferencia de rabiot para o olympique de marseille  segundo ele o motivo do meiocampista frances nao estar em uma equipe top10 da europa e o fato de ser agenciado por sua mae e ai acha que",
    Timestamp: "2024-09-18T18:15:33.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.6265605688095093,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet32",
    Content:
      "precisamos falar sobre viktor gyokeres o atacante do sporting marcou na sua estreia na championsleague e ajudou a garantir a vitoria contra o lille na primeira rodada o sueco acumula 12 gols e 5 assistencias em apenas 9 jogos vai se criando um monstro",
    Timestamp: "2024-09-18T18:14:12.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.6458969116210938,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet33",
    Content:
      "vai ter greve tem gente que nao ta muito feliz com o calendario de jogos la na europa e o rodri botou a boca no microfone e hablou em nome dos jogadores dizendo que se as coisas nao mudarem podemos ver uma greve futebolinternacional",
    Timestamp: "2024-09-18T17:06:50.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.7999714612960815,
    Custom_Category: "felicidade",
    Custom_Score: 2,
  },
  {
    Identifier: "tweet34",
    Content: "lili cantou",
    Timestamp: "2024-09-18T14:00:55.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.4274998903274536,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet35",
    Content:
      "dia 2 finalizado com sucesso quem nao ta completamente apaixonado pelo nossos atletas das paralimpiadasnacazetv ta maluco terceiro lugar no quadro geral e um saldo de simplesmente dez medalhas conquistadas so hoje\n\nbora que amanha tem mais e comeca cedoparis2024",
    Timestamp: "2024-08-30T23:40:39.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.7497032284736633,
    Custom_Category: "felicidade",
    Custom_Score: 3,
  },
  {
    Identifier: "tweet36",
    Content:
      "pode comemorar mais um medalha pro brasil giovanna boscolo que tinha terminado em quarto lugar no lancamento de club conquistou o bronze devido um recurso que desclassificou a polonesa campea da categoria nas paralimpiadasnacazetv paris2024 loteriascaixa",
    Timestamp: "2024-08-30T23:39:42.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.4620872437953949,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet37",
    Content:
      "assinou nos ultimos minutos do mercado da bola raheem sterling assinou com o arsenal por emprestimo de uma temporada fora dos planos do chelsea o atacante com passagens por liverpool e manchester city vai pro quarto gigante ingles da carreira que curriculo ta",
    Timestamp: "2024-08-30T22:41:43.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.4458795189857483,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet38",
    Content:
      "e oficial andre e o mais novo reforco do wolverhampton o clube ingles acertou com o fluminense a compra do jogador por 22 milhoes de euros fixos mais 3 milhoes de euros de bonus por metas atingidas o volante se junta ao companheiro de selecao joao gomes apelacao",
    Timestamp: "2024-08-30T21:47:56.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.4857812821865082,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet39",
    Content:
      "a melhor de todos os tempos a marta ja fazia isso ai no sub20 ta jogava pouco ta maluco voce pode acompanhar a estreia do brasil na copa do mundo feminina sub20 ao vivo de graca e com imagens na cazetv neste sabado 31 a partir das 19h30 futinter",
    Timestamp: "2024-08-30T21:30:00.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.3927563428878784,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet40",
    Content:
      "o chelsea nao para de contratar o novo reforco dos blues e jadon sancho que sera emprestado pelo manchester united sera que o jogador vai conseguir repetir o sucesso que teve no borussia dortmund agora em londres futebolinternacional premierleague",
    Timestamp: "2024-08-30T21:23:48.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.556308925151825,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet41",
    Content:
      "chegou chegando e o andrey comecou bem demais no strasbourg ta apesar da derrota de virada para o lyon o cria do vasco marcou gol pelo segundo jogo seguido sera que ele vai desencantar na temporada futebolinternacional ligue1nacazetv",
    Timestamp: "2024-08-30T21:03:54.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.7373867630958557,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet42",
    Content:
      "pra fechar a sexta com chave de ouroooooooooooooooo ana carolina moura e campea e ouro no taekwondo k44 e a vitoria veio em cima da francesa que lutava em casa vitoria maiuscula paris2024 paralimpiadasnacazetv loteriascaixa",
    Timestamp: "2024-08-30T20:57:49.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.3993428945541382,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet43",
    Content:
      "e ai de quem e a vaga velhos conhecidos tao se reencontrando so que agora no mesmo time joao gomes e andre vao brigar pela titularidade na volancia do wolverhampton pra voce quem deve ser o titular futebolinternacional",
    Timestamp: "2024-08-30T20:00:01.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.5394514203071594,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet44",
    Content:
      "o assunto noah lyles ainda esta rendendo dessa vez o tyreek hill do miami dolphins desafiou o campeao olimpico para uma corrida de 50m quem levaria a melhor nessa dia 6 de setembro tem philadelphia eagles e green bay packers ao vivo e de graca nflnacazetv",
    Timestamp: "2024-08-30T19:42:04.000Z",
    Sentiment: "positive",
    Sentiment_Score: 0.466235488653183,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet45",
    Content:
      "nao e bug nao e mais um bronze pro brasil amigo silvana fernandes garante a medalha no taekwondo k44 e foi de lavada na decisao 28 x 3 paris2024 paralimpiadasnacazetv loteriascaixa",
    Timestamp: "2024-08-30T19:39:04.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.4363134205341339,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet46",
    Content:
      "so ano que vem ainda se recuperando de lesao neymar pode nao ser inscrito pelo alhilal neste ano e existe a possibilidade do atacante voltar aos gramados apenas em 2025 o alhilal esta acima do limite de estrangeiros permitidos pela spl e jorge jesus nao deseja abrir mao",
    Timestamp: "2024-08-30T19:24:13.000Z",
    Sentiment: "negative",
    Sentiment_Score: 0.540279746055603,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet47",
    Content:
      "medalha medalha medalha y medalha a natacao brasileira e uma maquina de vencer nao tem jeito bronze para o brasa no revezamento misto 4x50 os brabos e brabas tem nome patricia ferreira lidia cruz daniel mendes e talisson glock paris2024 paralimpiadasnacazetv",
    Timestamp: "2024-08-30T19:15:23.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.4395342469215393,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
  {
    Identifier: "tweet48",
    Content:
      "olha o alerta passando no seu feed\nnossa braba do taekwondo carolina moura avancou pra grande final contra a dona da casa a francesa djelika daqui a pouco 17h30 vamos torcer muito pra nossa brazuca garantir mais um ouro nas paralimpiadasnacazetvparis2024 loteriascaixa",
    Timestamp: "2024-08-30T19:12:12.000Z",
    Sentiment: "neutral",
    Sentiment_Score: 0.43612006306648254,
    Custom_Category: "neutral",
    Custom_Score: 0,
  },
];

export default mockTweets;
