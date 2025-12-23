<!-- Tjänster/Underhåll & Support -->
<script lang="ts">
	import Header from "$components/layout/Header.svelte";
	import Footer from "$components/layout/Footer.svelte";
	import Section from "$src/lib/components/grid/Section.svelte";
	import Column from "$src/lib/components/grid/Column.svelte";

	import Hero from "$lib/sections/Hero.svelte";
	import HorizontalScrollSectionAlt from "$src/lib/sections/HorizontalScrollSectionAlt.svelte";
	import SectionDivider from "$src/lib/components/layout/SectionDivider.svelte";
	import TwoColumnTextImage from "$src/lib/sections/TwoColumnTextImage.svelte";
	import TabbedSection from "$src/lib/sections/TabbedSection.svelte";
	import FlexContainer from "$src/lib/components/layout/FlexContainer.svelte";
	import FAQ from "$lib/sections/FAQ.svelte";

	//types
	import type { AccordionItem } from "$src/lib/models/accordion";

	//content
	const heroAccordionItems: AccordionItem[] = [
		{
			title: "24/7",
			content:
				"<p>Vi håller koll dygnet runt och agerar direkt när något strular – helt utan stress.</p>",
			open: true,
		},
		{
			title: "Hosting",
			content:
				"<p>Snabb, säker och optimerad hosting där allt bara fungerar, utan att ni behöver lyfta ett finger.</p>",
		},
		{
			title: "Vidareutveckling",
			content:
				"<p>Vi förbättrar, bygger nytt och utvecklar er lösning löpande för att hålla er före konkurrenterna.</p>",
		},
	];

	//vad vi erbjuder
	const horizontalScrollTabsAlt = [
		{
			id: "1",
			label: "Säkerhetsuppdateringar",
			content: `
            <div class="cw-col-6 cw-col-xs-12 pt-4">
                <h4>Säkerhetsuppdateringar</h4>
                <p class="mt-1">
                    Vi håller din tekniska stack trygg och uppdaterad – från patchar och plugins till backend och servermiljöer. 
                    Du slipper oro för sårbarheter och kan fokusera på verksamheten medan vi tar hand om säkerheten löpande.
                </p>
            </div>
            <div class="cw-col-6 cw-col-xs-12 right-column">
                <div class="image-container-horizontal-scroll-alt">
                    <img src="/images/tjanster/underhall_support/security.png" loading="lazy" alt="Säkerhetsuppdateringar"/>
                </div>
            </div>
        `,
		},
		{
			id: "2",
			label: "Prestandaoptimeringar",
			content: `
            <div class="cw-col-6 cw-col-xs-12 pt-4">
                <h4>Prestandaoptimeringar</h4>
                <p class="mt-1">
                    Hastighet är hårdvaluta – både för SEO och användarupplevelse. 
                    Vi analyserar flaskhalsar, optimerar kod, trim­mar servrar och ser till att din webbplats känns lätt, snabb och redo att konvertera.
                </p>
            </div>
            <div class="cw-col-6 cw-col-xs-12">
                <div class="image-container-horizontal-scroll-alt">
                    <img src="/images/tjanster/underhall_support/performance.png" loading="lazy" alt="Prestandaoptimeringar"/>
                </div>
            </div>
        `,
		},
		{
			id: "3",
			label: "Övervakning",
			content: `
            <div class="cw-col-6 cw-col-xs-12 pt-4">
                <h4>Övervakning & incidenthantering</h4>
                <p class="mt-1">
                    Vi har ögonen på allt – dygnet runt. Vid oväntade fel agerar vi direkt, innan störningar hinner påverka kunder eller försäljning. 
                    Ingen panik, inga brandkårsutryckningar för er. Vi tar smällen åt er.
                </p>
            </div>
            <div class="cw-col-6 cw-col-xs-12">
                <div class="image-container-horizontal-scroll-alt">
                    <img src="/images/cw_generic_developers.png" alt="Övervakning och incidenthantering" loading="lazy"/>
                </div>
            </div>
        `,
		},
		{
			id: "4",
			label: "Löpande förbättringar",
			content: `
            <div class="cw-col-6 cw-col-xs-12 pt-4">
                <h4>Löpande förbättringar</h4>
                <p class="mt-1">
                    Små, smarta uppdateringar gör enorm skillnad över tid. 
                    Vi förbättrar UI, flöden och funktioner kontinuerligt så att er digitala upplevelse alltid ligger steget före – och känns modern även om åren går.
                </p>
            </div>
            <div class="cw-col-6 cw-col-xs-12">
                <div class="image-container-horizontal-scroll-alt">
                    <img src="/images/cw_generic_developers.png" alt="Löpande förbättringar" loading="lazy"/>
                </div>
            </div>
        `,
		},
		{
			id: "5",
			label: "Backup & Restore",
			content: `
            <div class="cw-col-6 cw-col-xs-12 pt-4">
                <h4>Backup & Restore</h4>
                <p class="mt-1">
                    Automatiska och säkra backuper som faktiskt fungerar när det gäller. 
                    Skulle något gå snett återställer vi snabbt allt till ett stabilt läge. 
                    Ni slipper långa driftstopp och kan andas lugnt även när tekniken strular.
                </p>
            </div>
            <div class="cw-col-6 cw-col-xs-12">
                <div class="image-container-horizontal-scroll-alt">
                    <img src="/images/tjanster/underhall_support/backup_restore.png" alt="Backup och återställning" loading="lazy"/>
                </div>
            </div>
        `,
		},
		{
			id: "6",
			label: "Support",
			content: `
            <div class="cw-col-6 cw-col-xs-12 pt-4">
                <h4>Support när ni behöver det</h4>
                <p class="mt-1">
                    Frågor, funderingar eller något som krånglar? 
                    Ni får raka, tydliga svar utan tekniskt mumbo-jumbo. 
                    Vi guidar, förklarar och löser – utan att ni behöver känna att minsta fråga är “dum”.
                </p>
            </div>
            <div class="cw-col-6 cw-col-xs-12">
                <div class="image-container-horizontal-scroll-alt">
                    <img src="/images/cw_generic_developers.png" alt="Support" loading="lazy"/>
                </div>	
            </div>
        `,
		},
	];

	//varför vi
	const whyUsTabs = [
		{
			id: "why",
			label: "WHY",
			items: [
				{
					id: "support",
					title: "Snabb support",
					ingress: "Alltid nära till hands",
					contentHtml: `
					    <div class="image-container">
						<img src="/images/tjanster/underhall_support/supportLady.jpg" alt="Backup och återställning" loading="lazy"/>
						</div>
                        <p>
                            Tillgänglig support ger trygghet när frågor eller problem uppstår. Oavsett om det gäller tekniska fel, uppdateringar eller användarstöd finns hjälp nära till hands för att snabbt lösa situationen. Det sparar tid, minskar frustration och säkerställer att webbplatsen kan fortsätta användas effektivt utan onödiga avbrott.
                        </p>
                    `,
				},
				{
					id: "övervakning",
					title: "Proaktiv övervakning",
					ingress: "Problem upptäcks innan de märks",
					contentHtml: `
					    <div class="image-container">
						<img src="/images/tjanster/underhall_support/monitoring.jpg" alt="Backup och återställning" loading="lazy"/>
						</div>
                        <p>
                            Proaktiv övervakning säkerställer att din webbplats fungerar som den ska, dygnet runt. Genom att upptäcka fel, prestandaproblem och säkerhetsrisker i ett tidigt skede kan åtgärder vidtas innan de påverkar besökare eller affär. Det skapar stabilitet, trygghet och minimerar driftstopp – samtidigt som din webbplats fortsätter leverera utan avbrott.
                        </p>
                    `,
				},
				{
					id: "underhall",
					title: "Löpande underhåll",
					ingress: "Webbplatsen hålls uppdaterad",
					contentHtml: `
	    <div class="image-container">
			<img src="/images/tjanster/underhall_support/maintain.jpg"
			     alt="Löpande tekniskt underhåll av webbplats"
			     loading="lazy"/>
		</div>
        <p>
            Löpande underhåll säkerställer att webbplatsen är uppdaterad, kompatibel och fungerar som den ska över tid. Genom regelbundna kontroller och justeringar minimeras risken för tekniska problem och framtida driftstörningar.
        </p>
    `,
				},
				{
					id: "sakerhet",
					title: "Säkerhetskontroller",
					ingress: "Skydd mot hot och intrång",
					contentHtml: `
	    <div class="image-container">
			<img src="/images/tjanster/underhall_support/secure.jpg"
			     alt="Säkerhetskontroller och skydd av webbplats"
			     loading="lazy"/>
		</div>
        <p>
            Återkommande säkerhetskontroller minskar risken för intrång, sårbarheter och oönskade avbrott. Genom att hålla system och komponenter uppdaterade skapas en trygg och stabil webbmiljö.
        </p>
    `,
				},
				{
					id: "backup",
					title: "Backup och återställning",
					ingress: "Trygg återställning vid problem",
					contentHtml: `
	    <div class="image-container">
			<img src="/images/tjanster/underhall_support/backup.jpg"
			     alt="Backup och återställning av webbplats"
			     loading="lazy"/>
		</div>
        <p>
            Regelbundna säkerhetskopior gör det möjligt att snabbt återställa webbplatsen vid fel, uppdateringsproblem eller incidenter. Det ger extra trygghet och minimerar påverkan om något oväntat skulle inträffa.
        </p>
    `,
				},
			],
		},
	];

	//accordion content config
	const accordionItems: AccordionItem[] = [
		{
			title: "Vad menas med underhåll av en webbplats?",
			content:
				"<p>Underhåll handlar om att se till att webbplatsen fortsätter fungera som den ska över tid. Det kan inkludera uppdateringar, teknisk översyn, prestandaförbättringar och mindre justeringar för att webbplatsen ska vara stabil, säker och aktuell.</p>",
			open: true,
		},
		{
			title: "Ingår support efter att webbplatsen är lanserad?",
			content:
				"<p>Nej. Support och underhåll ingår inte automatiskt efter lansering. Efter avslutat projekt kan support erbjudas som ett separat upplägg, anpassat efter verksamhetens behov.</p>",
		},
		{
			title: "Vilken typ av support kan jag köpa till?",
			content:
				"<p>Support kan omfatta teknisk felsökning, hjälp vid driftstörningar, mindre ändringar, uppdateringar eller rådgivning. Omfattningen anpassas efter hur aktiv webbplatsen är och vilken typ av stöd som behövs.</p>",
		},
		{
			title: "Arbetar ni med både löpande underhåll och punktinsatser?",
			content:
				"<p>Ja. Vi erbjuder både löpande underhållsavtal och support vid enstaka tillfällen. Det gör det möjligt att välja ett flexibelt upplägg utan långsiktiga åtaganden.</p>",
		},
		{
			title: "Hur snabbt kan ni hjälpa till vid problem?",
			content:
				"<p>Återkopplingstid och prioritering beror på vilket upplägg som valts. Vid löpande underhåll finns tydligare ramar för svarstider, medan punktinsatser hanteras i mån av tillgänglighet.</p>",
		},
		{
			title: "Kan ni ta över underhåll av en befintlig webbplats?",
			content:
				"<p>Ja. Vi kan ta över underhåll och support även för webbplatser vi inte själva byggt. Innan dess görs vanligtvis en teknisk genomgång för att säkerställa att webbplatsen är stabil och möjlig att underhålla.</p>",
		},
		{
			title: "Vad kostar underhåll och support?",
			content:
				"<p>Kostnaden beror på omfattning, teknisk komplexitet och valt upplägg. Vi är transparenta med prissättning och ger alltid en tydlig uppskattning innan arbetet påbörjas.</p>",
		},
	];
</script>

<Header />
<Hero
	title={`Vi ser, hör och <span class="highlight">löser</span> det ni inte ens märkt än.`}
	description="Med kontinuerligt underhåll får ni stabilitet, trygghet och en sajt som faktiskt håller jämna steg med verksamheten. Vi ser till att allt rullar, utan driftstopp, säkerhetsproblem eller plötsliga överraskningar."
	accordionItems={heroAccordionItems}
>
	<FlexContainer class="h-100 w-100 align-center justify-center">
		<div class="hero-image-container">
			<img
				src="/images/tjanster/underhall_support/hero_image.png"
				alt="Man som håller en surfplatta med en futuristisk 3D-overlay"
			/>
		</div>
	</FlexContainer>
</Hero>
<SectionDivider borderBottom />
<HorizontalScrollSectionAlt
	subheading="vad vi erbjuder"
	heading="vi håller koll på allt"
	tabs={horizontalScrollTabsAlt}
></HorizontalScrollSectionAlt>
<TwoColumnTextImage
	heading={'En webbplats är aldrig "klar". <br/> Den ska fungera, och utvecklas.'}
	subheading={"Varför underhåll spelar roll"}
	body={`De flesta företag låter webbplatsen samla damm tills något går sönder.
	Det är som att först serva bilen när motorn redan brinner.

	Med kontinuerligt underhåll får ni stabilitet, trygghet och en sajt som faktiskt håller jämna steg med verksamheten. Vi ser till att allt rullar, utan driftstopp, säkerhetsproblem eller plötsliga överraskningar.`}
	imageUrl="/images/cw_generic_developers.png"
/>

<SectionDivider borderBottom />
<Section lines="XX-XX" borderBottom>
	<Column span={3}></Column>
	<Column span={6} class="py-2">
		<p class="subheading text-accent text-center">varför välja oss</p>
		<h2 class="text-center px-1">
			Engagemang som större byråer glömt bort
		</h2>
	</Column>
	<Column span={3}></Column>
</Section>
<TabbedSection type={"single"} groups={whyUsTabs} reverse />
<FAQ
	{accordionItems}
	imageUrl="/images/tjanster/marknadsforing/faq_image.png"
	title="Frågor vi ofta får om marknadsföring"
/>
<Footer />

<style lang="scss">
	:global(.hero-image-container) {
		height: 100%;
		width: 100%;
		// border: 1px solid var(--border-color);
		position: absolute;
		z-index: 2;

		@media (max-width: 768px) {
			height: 100%;
			width: 100%;
			position: relative;
			border: none;
		}

		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
</style>
