require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);
const BASE_URL = process.env.BASE_URL;
const ADMIN_ID = parseInt(process.env.ADMIN_ID); 
const DATA_FILE = './data.json';

// ================== DATA MANAGEMENT ==================

function initializeData() {
  const defaultData = { users: [], totalEmails: 0 };
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
  return defaultData;
}

function getData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return initializeData();
    const content = fs.readFileSync(DATA_FILE, 'utf8').trim();
    if (!content) return initializeData();
    return JSON.parse(content);
  } catch (e) {
    return initializeData();
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ================== CONFIGURATION ==================

const RECIPIENTS = [
  "georg.mayer@europarl.europa.eu",
  "evelyn.regner@europarl.europa.eu",
  "thomas.waitz@europarl.europa.eu",
  "harald.vilimsky@europarl.europa.eu",
  "lukas.mandl@europarl.europa.eu",
  "guenther.sidl@europarl.europa.eu",
  "andreas.schieder@europarl.europa.eu",
  "angelika.winzig@europarl.europa.eu",
  "alexander.bernhuber@europarl.europa.eu",
  "roman.haider@europarl.europa.eu",
  "hannes.heide@europarl.europa.eu",
  "reinhold.lopatka@europarl.europa.eu",
  "petra.steger@europarl.europa.eu",
  "anna.sturgkh@europarl.europa.eu",
  "helmut.brandstaetter@europarl.europa.eu",
  "elisabeth.grossmann@europarl.europa.eu",
  "gerald.hauser@europarl.europa.eu",
  "sophia.kircher@europarl.europa.eu",
  "lena.schilling@europarl.europa.eu",
  "elisabeth.dieringer@europarl.europa.eu",
  "kristian.vigenin@europarl.europa.eu",
  "eva.maydell@europarl.europa.eu",
  "andrey.kovatchev@europarl.europa.eu",
  "andrey.novakov@europarl.europa.eu",
  "ilhan.kyuchyuk@europarl.europa.eu",
  "emil.radev@europarl.europa.eu",
  "tsvetelina.penkova@europarl.europa.eu",
  "elena.yoncheva@europarl.europa.eu",
  "radan.kanev@europarl.europa.eu",
  "nikola.minchev@europarl.europa.eu",
  "ilia.lazarov@europarl.europa.eu",
  "hristo.petrov@europarl.europa.eu",
  "ivaylo.valchev@europarl.europa.eu",
  "petar.volgin@europarl.europa.eu",
  "stanislav.stoyanov@europarl.europa.eu",
  "taner.kabilov@europarl.europa.eu",
  "rada.laykova@europarl.europa.eu",
  "kathleen.vanbrempt@europarl.europa.eu",
  "pascal.arimont@europarl.europa.eu",
  "elio.dirupo@europarl.europa.eu",
  "johan.vanovertveldt@europarl.europa.eu",
  "hilde.vautmans@europarl.europa.eu",
  "gerolf.annemans@europarl.europa.eu",
  "marcjohan.botenga@europarl.europa.eu",
  "tom.vandendriessche@europarl.europa.eu",
  "assita.kanko@europarl.europa.eu",
  "saskia.bricmont@europarl.europa.eu",
  "olivier.chastel@europarl.europa.eu",
  "sara.matthieu@europarl.europa.eu",
  "sophie.wilmes@europarl.europa.eu",
  "yvan.verougstraete@europarl.europa.eu",
  "benoit.cassart@europarl.europa.eu",
  "wouter.beke@europarl.europa.eu",
  "rudi.kennes@europarl.europa.eu",
  "bruno.tobback@europarl.europa.eu",
  "barbara.bonte@europarl.europa.eu",
  "estelle.ceulemans@europarl.europa.eu",
  "kris.vandijck@europarl.europa.eu",
  "liesbet.sommen@europarl.europa.eu",
  "biljana.borzan@europarl.europa.eu",
  "tonino.picula@europarl.europa.eu",
  "zeljana.zovko@europarl.europa.eu",
  "davorivo.stier@europarl.europa.eu",
  "romana.jerkovic@europarl.europa.eu",
  "tomislav.sokol@europarl.europa.eu",
  "karlo.ressler@europarl.europa.eu",
  "nikolina.brnjac@europarl.europa.eu",
  "suncana.glavak@europarl.europa.eu",
  "gordan.bosanac@europarl.europa.eu",
  "stephennikola.bartulica@europarl.europa.eu",
  "marko.vesligaj@europarl.europa.eu",
  "costas.mavrides@europarl.europa.eu",
  "giorgos.georgiou@europarl.europa.eu",
  "loucas.fourlas@europarl.europa.eu",
  "geadis.geadi@europarl.europa.eu",
  "fidias.panayiotou@europarl.europa.eu",
  "michael.hadjipantela@europarl.europa.eu",
  "katerina.konecna@europarl.europa.eu",
  "ludek.niedermayer@europarl.europa.eu",
  "tomas.zdechovsky@europarl.europa.eu",
  "ivan.david@europarl.europa.eu",
  "marketa.gregorova@europarl.europa.eu",
  "alexandr.vondra@europarl.europa.eu",
  "ondrej.knotek@europarl.europa.eu",
  "veronika.vrecionova@europarl.europa.eu",
  "jaroslav.bzoch@europarl.europa.eu",
  "jan.farsky@europarl.europa.eu",
  "ondrej.dostal@europarl.europa.eu",
  "jaroslava.pokornajermanova@europarl.europa.eu",
  "danuse.nerudova@europarl.europa.eu",
  "ondrej.krutilek@europarl.europa.eu",
  "jana.nagyova@europarl.europa.eu",
  "ondrej.kolar@europarl.europa.eu",
  "nikola.bartusek@europarl.europa.eu",
  "klara.dostalova@europarl.europa.eu",
  "antonin.stanek@europarl.europa.eu",
  "tomas.kubin@europarl.europa.eu",
  "jaroslav.knot@europarl.europa.eu",
  "christel.schaldemose@europarl.europa.eu",
  "niels.fuglsang@europarl.europa.eu",
  "morten.lokkegaard@europarl.europa.eu",
  "anders.vistisen@europarl.europa.eu",
  "villy.sovndal@europarl.europa.eu",
  "asger.christensen@europarl.europa.eu",
  "kira.peter-hansen@europarl.europa.eu",
  "marianne.vind@europarl.europa.eu",
  "per.clausen@europarl.europa.eu",
  "stine.bosse@europarl.europa.eu",
  "henrik.dahl@europarl.europa.eu",
  "kristoffer.storm@europarl.europa.eu",
  "sigrid.friis@europarl.europa.eu",
  "rasmus.nordqvist@europarl.europa.eu",
  "niels.hansen@europarl.europa.eu",
  "urmas.paet@europarl.europa.eu",
  "jana.toom@europarl.europa.eu",
  "juri.ratas@europarl.europa.eu",
  "sven.mikser@europarl.europa.eu",
  "marina.kaljurand@europarl.europa.eu",
  "jaak.madison@europarl.europa.eu",
  "riho.terras@europarl.europa.eu",
  "sirpa.pietikainen@europarl.europa.eu",
  "aura.salla@europarl.europa.eu",
  "elsi.katainen@europarl.europa.eu",
  "merja.kyllonen@europarl.europa.eu",
  "jussi.saramo@europarl.europa.eu",
  "ville.niinisto@europarl.europa.eu",
  "eero.heinaluoma@europarl.europa.eu",
  "maria.ohisalo@europarl.europa.eu",
  "katri.kulmuni@europarl.europa.eu",
  "anna-maja.henriksson@europarl.europa.eu",
  "maria.guzenina@europarl.europa.eu",
  "pekka.toveri@europarl.europa.eu",
  "sebastian.tynkkynen@europarl.europa.eu",
  "mika.aaltola@europarl.europa.eu",
  "li.andersson@europarl.europa.eu",
  "pascal.canfin@europarl.europa.eu",
  "younous.omarjee@europarl.europa.eu",
  "fabienne.keller@europarl.europa.eu",
  "marie.toussaint@europarl.europa.eu",
  "catherine.griset@europarl.europa.eu",
  "nadine.morano@europarl.europa.eu",
  "alexandre.varaut@europarl.europa.eu",
  "guillaume.peltier@europarl.europa.eu",
  "julien.sanchez@europarl.europa.eu",
  "valerie.hayer@europarl.europa.eu",
  "nicolas.bay@europarl.europa.eu",
  "jordan.bardella@europarl.europa.eu",
  "france.jamet@europarl.europa.eu",
  "gilles.pennelle@europarl.europa.eu",
  "gilles.boyer@europarl.europa.eu",
  "jeremy.decerle@europarl.europa.eu",
  "david.cormand@europarl.europa.eu",
  "christophe.grudler@europarl.europa.eu",
  "manon.aubry@europarl.europa.eu",
  "damien.careme@europarl.europa.eu",
  "thierry.mariani@europarl.europa.eu",
  "bernard.guetta@europarl.europa.eu",
  "mounir.satouri@europarl.europa.eu",
  "nathalie.loiseau@europarl.europa.eu",
  "leila.chaibi@europarl.europa.eu",
  "stephanie.yon@europarl.europa.eu",
  "fxbellamy@europarl.europa.eu",
  "virginie.joron@europarl.europa.eu",
  "jean-paul.garraud@europarl.europa.eu",
  "laurence.farreng@europarl.europa.eu",
  "marina.mesure@europarl.europa.eu",
  "marie.dauchy@europarl.europa.eu",
  "christophe.clergeau@europarl.europa.eu",
  "andre.rouge@europarl.europa.eu",
  "philippe.olivier@europarl.europa.eu",
  "aurore.lalucq@europarl.europa.eu",
  "raphael.glucksmann@europarl.europa.eu",
  "nora.mebarek@europarl.europa.eu",
  "mathilde.androuet@europarl.europa.eu",
  "pierre-romain.thionnet@europarl.europa.eu",
  "majdouline.sbai@europarl.europa.eu",
  "isabelle.lecallennec@europarl.europa.eu",
  "julie.rechagneux@europarl.europa.eu",
  "thomas.pellerin-carlin@europarl.europa.eu",
  "arash.saeidi@europarl.europa.eu",
  "celine.imart@europarl.europa.eu",
  "laurence.trochu@europarl.europa.eu",
  "valerie.devaux@europarl.europa.eu",
  "fabrice.leggeri@europarl.europa.eu",
  "rody.tolassy@europarl.europa.eu",
  "chloe.ridel@europarl.europa.eu",
  "pascale.piera@europarl.europa.eu",
  "murielle.laurent@europarl.europa.eu",
  "jean-marc.germain@europarl.europa.eu",
  "anthony.smith@europarl.europa.eu",
  "sarah.knafo@europarl.europa.eu",
  "melanie.disdier@europarl.europa.eu",
  "aleksandar.nikolic@europarl.europa.eu",
  "rima.hassan@europarl.europa.eu",
  "marion.marechal@europarl.europa.eu",
  "matthieu.valet@europarl.europa.eu",
  "anne-sophie.frigout@europarl.europa.eu",
  "pierre.jouvet@europarl.europa.eu",
  "claire.fita@europarl.europa.eu",
  "emma.fourreau@europarl.europa.eu",
  "malika.sorel@europarl.europa.eu",
  "pierre.pimpie@europarl.europa.eu",
  "angeline.furet@europarl.europa.eu",
  "eric.sargiacomo@europarl.europa.eu",
  "francois.kalfon@europarl.europa.eu",
  "christophe.gomart@europarl.europa.eu",
  "laurent.castillo@europarl.europa.eu",
  "gregory.allione@europarl.europa.eu",
  "marie-luce.brasier-clain@europarl.europa.eu",
  "valerie.deloge@europarl.europa.eu",
  "julien.leonardelli@europarl.europa.eu",
  "emma.rafowicz@europarl.europa.eu",
  "melissa.camara@europarl.europa.eu",
  "severine.werbrouck@europarl.europa.eu",
  "christophe.bay@europarl.europa.eu",
  "daniel.caspary@europarl.europa.eu",
  "markus.ferber@europarl.europa.eu",
  "manfred.weber@europarl.europa.eu",
  "bernd.lange@europarl.europa.eu",
  "udo.bullmann@europarl.europa.eu",
  "michael.gahler@europarl.europa.eu",
  "terry.reintke@europarl.europa.eu",
  "christian.ehler@europarl.europa.eu",
  "lena.duepont@europarl.europa.eu",
  "angelika.niebler@europarl.europa.eu",
  "sabine.verheyen@europarl.europa.eu",
  "martin.haeusling@europarl.europa.eu",
  "andreas.schwab@europarl.europa.eu",
  "peter.liese@europarl.europa.eu",
  "jens.geier@europarl.europa.eu",
  "birgit.sippel@europarl.europa.eu",
  "monika.hohlmeier@europarl.europa.eu",
  "axel.voss@europarl.europa.eu",
  "anna.cavazzini@europarl.europa.eu",
  "ruth.firmenich@europarl.europa.eu",
  "alexandra.geese@europarl.europa.eu",
  "david.mcallister@europarl.europa.eu",
  "norbert.lins@europarl.europa.eu",
  "tiemo.woelken@europarl.europa.eu",
  "dennis.radtke@europarl.europa.eu",
  "daniel.freund@europarl.europa.eu",
  "jens.gieseke@europarl.europa.eu",
  "maria.noichl@europarl.europa.eu",
  "martin.schirdewan@europarl.europa.eu",
  "markus.buchheit@europarl.europa.eu",
  "fabio.demasi@europarl.europa.eu",
  "martin.sonneborn@europarl.europa.eu",
  "tomasz.froelich@europarl.europa.eu",
  "ralf.seekatz@europarl.europa.eu",
  "oezlem.demirel@europarl.europa.eu",
  "sergey.lagodinsky@europarl.europa.eu",
  "engin.eroglu@europarl.europa.eu",
  "katarina.barley@europarl.europa.eu",
  "delara.burkhardt@europarl.europa.eu",
  "jan-christoph.oetjen@europarl.europa.eu",
  "katrin.langensiepen@europarl.europa.eu",
  "hannah.neumann@europarl.europa.eu",
  "gabriele.bischoff@europarl.europa.eu",
  "sven.simon@europarl.europa.eu",
  "jutta.paulus@europarl.europa.eu",
  "hildegard.bentele@europarl.europa.eu",
  "christine.schneider@europarl.europa.eu",
  "andreas.glueck@europarl.europa.eu",
  "stefan.berger@europarl.europa.eu",
  "erik.marquardt@europarl.europa.eu",
  "christian.doleschal@europarl.europa.eu",
  "damian.boeselager@europarl.europa.eu",
  "svenja.hahn@europarl.europa.eu",
  "moritz.koerner@europarl.europa.eu",
  "rasmus.andresen@europarl.europa.eu",
  "niclas.herbst@europarl.europa.eu",
  "michael.bloss@europarl.europa.eu",
  "marionerika.walsmann@europarl.europa.eu",
  "christine.anderson@europarl.europa.eu",
  "matthias.ecke@europarl.europa.eu",
  "niels.geuking@europarl.europa.eu",
  "rene.repasi@europarl.europa.eu",
  "manuela.ripa@europarl.europa.eu",
  "marie-agnes.strack-zimmermann@europarl.europa.eu",
  "sebastian.everding@europarl.europa.eu",
  "anja.arndt@europarl.europa.eu",
  "mary.khan@europarl.europa.eu",
  "jan-peter.warnke@europarl.europa.eu",
  "sabrina.repp@europarl.europa.eu",
  "arno.bausemer@europarl.europa.eu",
  "alexander.sell@europarl.europa.eu",
  "sibylle.berg@europarl.europa.eu",
  "friedrich.puerner@europarl.europa.eu",
  "alexander.jungbluth@europarl.europa.eu",
  "hans.neuhoff@europarl.europa.eu",
  "nela.riehl@europarl.europa.eu",
  "stefan.koehler@europarl.europa.eu",
  "alexandra.mehnert@europarl.europa.eu",
  "christine.singer@europarl.europa.eu",
  "michael.vonderschulenburg@europarl.europa.eu",
  "oliver.schenk@europarl.europa.eu",
  "rene.aust@europarl.europa.eu",
  "thomas.geisel@europarl.europa.eu",
  "marc.jongen@europarl.europa.eu",
  "irmhild.bossdorf@europarl.europa.eu",
  "andrea.wechsler@europarl.europa.eu",
  "joachim.streit@europarl.europa.eu",
  "lukas.sieper@europarl.europa.eu",
  "petr.bystron@europarl.europa.eu",
  "tobias.cremer@europarl.europa.eu",
  "siegbert.droese@europarl.europa.eu",
  "kai.tegethoff@europarl.europa.eu",
  "verena.mertens@europarl.europa.eu",
  "vivien.costanzo@europarl.europa.eu",
  "martin.guenther@europarl.europa.eu",
  "volker.schnurrbusch@europarl.europa.eu",
  "elissavet.vozemberg@europarl.europa.eu",
  "emmanouil.kefalogiannis@europarl.europa.eu",
  "kostas.papadakis@europarl.europa.eu",
  "evangelos.meimarakis@europarl.europa.eu",
  "nikos.papandreou@europarl.europa.eu",
  "konstantinos.arvanitis@europarl.europa.eu",
  "emmanouil.fragkos@europarl.europa.eu",
  "lefteris.nikolaou@europarl.europa.eu",
  "elena.kountoura@europarl.europa.eu",
  "ioannis.maniatis@europarl.europa.eu",
  "nikolaos.anadiotis@europarl.europa.eu",
  "georgios.aftias@europarl.europa.eu",
  "nikolaos.farantouris@europarl.europa.eu",
  "sakis.arnaoutoglou@europarl.europa.eu",
  "maria.zacharia@europarl.europa.eu",
  "galato.alexandraki@europarl.europa.eu",
  "dimitrios.tsiodras@europarl.europa.eu",
  "eleonora.meleti@europarl.europa.eu",
  "afroditi.latinopoulou@europarl.europa.eu",
  "nikolaos.pappas@europarl.europa.eu",
  "fredis.beleris@europarl.europa.eu",
  "sean.kelly@europarl.europa.eu",
  "lukeming.flanagan@europarl.europa.eu",
  "lynn.boylan@europarl.europa.eu",
  "maria.walsh@europarl.europa.eu",
  "barry.andrews@europarl.europa.eu",
  "billy.kelleher@europarl.europa.eu",
  "aodhan.oriordain@europarl.europa.eu",
  "nina.carberry@europarl.europa.eu",
  "ciaran.mullooly@europarl.europa.eu",
  "michael.mcnamara@europarl.europa.eu",
  "barry.cowen@europarl.europa.eu",
  "regina.doherty@europarl.europa.eu",
  "kathleen.funchion@europarl.europa.eu",
  "cynthia.nimhurchu@europarl.europa.eu",
  "leoluca.orlando@europarl.europa.eu",
  "nicola.zingaretti@europarl.europa.eu",
  "paolo.borchia@europarl.europa.eu",
  "herbert.dorfmann@europarl.europa.eu",
  "carlo.fidanza@europarl.europa.eu",
  "aldo.patriciello@europarl.europa.eu",
  "sergio.berlato@europarl.europa.eu",
  "mario.mantovani@europarl.europa.eu",
  "flavio.tosi@europarl.europa.eu",
  "caterina.chinnici@europarl.europa.eu",
  "giuseppina.picierno@europarl.europa.eu",
  "brando.benifei@europarl.europa.eu",
  "fulvio.martusciello@europarl.europa.eu",
  "massimiliano.salini@europarl.europa.eu",
  "alessandra.moretti@europarl.europa.eu",
  "dario.tamburrano@europarl.europa.eu",
  "pietro.fiocchi@europarl.europa.eu",
  "elisabetta.gualmini@europarl.europa.eu",
  "irene.tinagli@europarl.europa.eu",
  "isabella.tovaglieri@europarl.europa.eu",
  "silvia.sardone@europarl.europa.eu",
  "sandro.gozi@europarl.europa.eu",
  "denis.nesci@europarl.europa.eu",
  "raffaele.stancanelli@europarl.europa.eu",
  "giuseppe.milazzo@europarl.europa.eu",
  "camilla.laureti@europarl.europa.eu",
  "nicola.procaccini@europarl.europa.eu",
  "mario.furore@europarl.europa.eu",
  "chiara.gemma@europarl.europa.eu",
  "salvatore.demeo@europarl.europa.eu",
  "susanna.ceccardi@europarl.europa.eu",
  "roberto.vannacci@europarl.europa.eu",
  "pasquale.tridico@europarl.europa.eu",
  "antonella.sberna@europarl.europa.eu",
  "ilaria.salis@europarl.europa.eu",
  "giovanni.crosetto@europarl.europa.eu",
  "carolina.morace@europarl.europa.eu",
  "giuseppe.lupo@europarl.europa.eu",
  "domenico.lucano@europarl.europa.eu",
  "benedetta.scuderi@europarl.europa.eu",
  "giorgio.gori@europarl.europa.eu",
  "ruggero.razza@europarl.europa.eu",
  "stefano.bonaccini@europarl.europa.eu",
  "matteo.ricci@europarl.europa.eu",
  "ignazio.marino@europarl.europa.eu",
  "elena.donazzan@europarl.europa.eu",
  "francesco.ventola@europarl.europa.eu",
  "marco.squarta@europarl.europa.eu",
  "antonio.decaro@europarl.europa.eu",
  "gaetano.pedulla@europarl.europa.eu",
  "cristina.guarda@europarl.europa.eu",
  "michele.picaro@europarl.europa.eu",
  "alberico.gambino@europarl.europa.eu",
  "anna.cisint@europarl.europa.eu",
  "giusi.princi@europarl.europa.eu",
  "giuseppe.antoci@europarl.europa.eu",
  "alessandro.ciriani@europarl.europa.eu",
  "lara.magoni@europarl.europa.eu",
  "stefano.cavedagna@europarl.europa.eu",
  "valentina.palmisano@europarl.europa.eu",
  "paolo.inselvini@europarl.europa.eu",
  "carlo.ciccioli@europarl.europa.eu",
  "marco.falcone@europarl.europa.eu",
  "daniele.polato@europarl.europa.eu",
  "raffaele.topo@europarl.europa.eu",
  "alessandro.zan@europarl.europa.eu",
  "lucia.annunziata@europarl.europa.eu",
  "mariateresa.vivaldini@europarl.europa.eu",
  "letizia.moratti@europarl.europa.eu",
  "cecilia.strada@europarl.europa.eu",
  "dario.nardella@europarl.europa.eu",
  "sandro.ruotolo@europarl.europa.eu",
  "francesco.torselli@europarl.europa.eu",
  "annalisa.corrado@europarl.europa.eu",
  "marco.tarquinio@europarl.europa.eu",
  "danilo.dellavalle@europarl.europa.eu",
  "pierfrancesco.maran@europarl.europa.eu",
  "inese.vaidere@europarl.europa.eu",
  "sandra.kalniete@europarl.europa.eu",
  "roberts.zile@europarl.europa.eu",
  "ivars.ijabs@europarl.europa.eu",
  "nils.usakovs@europarl.europa.eu",
  "rihards.kols@europarl.europa.eu",
  "reinis.poznaks@europarl.europa.eu",
  "vilis.kristopans@europarl.europa.eu",
  "martins.stakis@europarl.europa.eu",
  "vilija.blinkeviciute@europarl.europa.eu",
  "waldemar.tomaszewski@europarl.europa.eu",
  "petras.austrevicius@europarl.europa.eu",
  "vytenis.andriukaitis@europarl.europa.eu",
  "rasa.jukneviciene@europarl.europa.eu",
  "liudas.mazylis@europarl.europa.eu",
  "virginijus.sinkevicius@europarl.europa.eu",
  "aurelijus.veryga@europarl.europa.eu",
  "paulius.saudargas@europarl.europa.eu",
  "dainius.zalimas@europarl.europa.eu",
  "petras.grazulis@europarl.europa.eu",
  "charles.goerens@europarl.europa.eu",
  "tilly.metz@europarl.europa.eu",
  "isabel.wiseler@europarl.europa.eu",
  "martine.kemp@europarl.europa.eu",
  "marc.angel@europarl.europa.eu",
  "fernand.kartheiser@europarl.europa.eu",
  "david.casa@europarl.europa.eu",
  "alex.agiussaliba@europarl.europa.eu",
  "roberta.metsola@europarl.europa.eu",
  "peter.agius@europarl.europa.eu",
  "daniel.attard@europarl.europa.eu",
  "thomas.bajada@europarl.europa.eu",
  "jeroen.lenaers@europarl.europa.eu",
  "lara.wolters@europarl.europa.eu",
  "bas.eickhout@europarl.europa.eu",
  "gerbrandy@europarl.europa.eu",
  "auke.zijlstra@europarl.europa.eu",
  "dirk.gotink@europarl.europa.eu",
  "marit.maij@europarl.europa.eu",
  "mieke.andriese@europarl.europa.eu",
  "anja.hazekamp@europarl.europa.eu",
  "marieke.ehlers@europarl.europa.eu",
  "sander.smit@europarl.europa.eu",
  "bart.groothuis@europarl.europa.eu",
  "thijs.reuten@europarl.europa.eu",
  "tineke.strik@europarl.europa.eu",
  "malik.azmani@europarl.europa.eu",
  "kim.vansparrentak@europarl.europa.eu",
  "mohammed.chahim@europarl.europa.eu",
  "bert-jan.ruissen@europarl.europa.eu",
  "tom.berendsen@europarl.europa.eu",
  "jessika.vanleeuwen@europarl.europa.eu",
  "rachel.blom@europarl.europa.eu",
  "raquel.garciahermida-vanderwalle@europarl.europa.eu",
  "ton.diepeveen@europarl.europa.eu",
  "sebastian.kruis@europarl.europa.eu",
  "ingeborg.terlaak@europarl.europa.eu",
  "reinier.vanlanschot@europarl.europa.eu",
  "brigitte.vandenberg@europarl.europa.eu",
  "anna.strolenberg@europarl.europa.eu",
  "jeannette.baljeu@europarl.europa.eu",
  "jeannettenicole.baljeu@europarl.europa.eu",
  "anouk.vanbrug@europarl.europa.eu",
  "catarina.vieira@europarl.europa.eu",
  "adam.bielan@europarl.europa.eu",
  "janusz.lewandowski@europarl.europa.eu",
  "elzbieta.lukacijewska@europarl.europa.eu",
  "waldemar.buda@europarl.europa.eu",
  "bartlomiej.sienkiewicz@europarl.europa.eu",
  "jadwiga.wisniewska@europarl.europa.eu",
  "kosma.zlotowski@europarl.europa.eu",
  "krzysztof.hetman@europarl.europa.eu",
  "bogdan.zdrojewski@europarl.europa.eu",
  "beata.szydlo@europarl.europa.eu",
  "patryktomasz.jaki@europarl.europa.eu",
  "bogdan.rzonca@europarl.europa.eu",
  "robert.biedron@europarl.europa.eu",
  "lukasz.kohut@europarl.europa.eu",
  "bartosz.arlukowicz@europarl.europa.eu",
  "ewabozena.kopacz@europarl.europa.eu",
  "anna.zalewska@europarl.europa.eu",
  "adam.jarubas@europarl.europa.eu",
  "joachim.brudzinski@europarl.europa.eu",
  "andrzej.halicki@europarl.europa.eu",
  "magdalena.adamowicz@europarl.europa.eu",
  "krzysztof.brejza@europarl.europa.eu",
  "dominik.tarczynski@europarl.europa.eu",
  "michal.szczerba@europarl.europa.eu",
  "jacek.protas@europarl.europa.eu",
  "kamila.gasiuk-pihowicz@europarl.europa.eu",
  "dariusz.jonski@europarl.europa.eu",
  "michal.kobosko@europarl.europa.eu",
  "michal.wawrykiewicz@europarl.europa.eu",
  "miroslawa.nykiel@europarl.europa.eu",
  "stanislaw.tyszka@europarl.europa.eu",
  "anna.brylka@europarl.europa.eu",
  "michal.dworczyk@europarl.europa.eu",
  "marta.wcislo@europarl.europa.eu",
  "maciej.wasik@europarl.europa.eu",
  "ewa.zajaczkowska-hernik@europarl.europa.eu",
  "tomasz.buczek@europarl.europa.eu",
  "jagna.marczulajtis-walczak@europarl.europa.eu",
  "joanna.scheuring-wielgus@europarl.europa.eu",
  "malgorzata.gosiewska@europarl.europa.eu",
  "arkadiusz.mularczyk@europarl.europa.eu",
  "andrzej.bula@europarl.europa.eu",
  "marlena.malag@europarl.europa.eu",
  "mariusz.kaminski@europarl.europa.eu",
  "grzegorz.braun@europarl.europa.eu",
  "jacek.ozdoba@europarl.europa.eu",
  "borys.budka@europarl.europa.eu",
  "marcin.sypniewski@europarl.europa.eu",
  "tobiasz.bochenski@europarl.europa.eu",
  "krzysztof.smiszek@europarl.europa.eu",
  "daniel.obajtek@europarl.europa.eu",
  "piotr.muller@europarl.europa.eu",
  "hanna.gronkiewicz-waltz@europarl.europa.eu",
  "francisco.assis@europarl.europa.eu",
  "anamiguel.pedro@europarl.europa.eu",
  "lidia.pereira@europarl.europa.eu",
  "marta.temido@europarl.europa.eu",
  "catarina.martins@europarl.europa.eu",
  "joao.oliveira@europarl.europa.eu",
  "bruno.goncalves@europarl.europa.eu",
  "sebastiao.bugalho@europarl.europa.eu",
  "sergio.humberto@europarl.europa.eu",
  "joao.cotrim@europarl.europa.eu",
  "paulo.cunha@europarl.europa.eu",
  "pauloalexandre.matoscunha@europarl.europa.eu",
  "tiago.damotaveigamoreiradesa@europarl.europa.eu",
  "tiago.moreiradesa@europarl.europa.eu",
  "carla.tavares@europarl.europa.eu",
  "isilda.gomes@europarl.europa.eu",
  "antonio.tangercorrea@europarl.europa.eu",
  "anacatarina.mendes@europarl.europa.eu",
  "andre.franqueirarodrigues@europarl.europa.eu",
  "paulo.nascimentocabral@europarl.europa.eu",
  "ana.vasconcelosmartins@europarl.europa.eu",
  "ana.vasconcelos@europarl.europa.eu",
  "helder.sousasilva@europarl.europa.eu",
  "sergio.sousagoncalves@europarl.europa.eu",
  "vasile.dincu@europarl.europa.eu",
  "victor.negrescu@europarl.europa.eu",
  "nicolae.stefanuta@europarl.europa.eu",
  "lorant.vincze@europarl.europa.eu",
  "iuliu.winkler@europarl.europa.eu",
  "adina.valean@europarl.europa.eu",
  "andi.cristea@europarl.europa.eu",
  "dan.nica@europarl.europa.eu",
  "maria.grapini@europarl.europa.eu",
  "siegfried.muresan@europarl.europa.eu",
  "daniel.buda@europarl.europa.eu",
  "iulian-claudiu.manda@europarl.europa.eu",
  "eugen.tomac@europarl.europa.eu",
  "ioan-rares.bogdan@europarl.europa.eu",
  "dan-stefan.motreanu@europarl.europa.eu",
  "cristian.terhes@europarl.europa.eu",
  "adrian-dragos.benea@europarl.europa.eu",
  "dragos.benea@europarl.europa.eu",
  "gheorghe.falca@europarl.europa.eu",
  "mircea.hava@europarl.europa.eu",
  "mihai.tudose@europarl.europa.eu",
  "gabriela.firea@europarl.europa.eu",
  "serban.dimitrie.sturdza@europarl.europa.eu",
  "stefan.musoiu@europarl.europa.eu",
  "vlad.voiculescu@europarl.europa.eu",
  "gheorghe.carciu@europarl.europa.eu",
  "gheorghe-florin.carciu@europarl.europa.eu",
  "claudiu-richard.tarziu@europarl.europa.eu",
  "diana.iovanovicisosoaca@europarl.europa.eu",
  "virgil.popescu@europarl.europa.eu",
  "dan.barna@europarl.europa.eu",
  "georgiana.teodorescu@europarl.europa.eu",
  "adrian-george.axinia@europarl.europa.eu",
  "gheorghe.piperea@europarl.europa.eu",
  "luis.lazarus@europarl.europa.eu",
  "monika.benova@europarl.europa.eu",
  "katarina.roth@europarl.europa.eu",
  "michal.wiezik@europarl.europa.eu",
  "milan.uhrik@europarl.europa.eu",
  "miriam.lexmann@europarl.europa.eu",
  "martin.hojsik@europarl.europa.eu",
  "judita.lassakova@europarl.europa.eu",
  "milan.mazurek@europarl.europa.eu",
  "erik.kalinak@europarl.europa.eu",
  "branislav.ondrus@europarl.europa.eu",
  "lucia.yar@europarl.europa.eu",
  "lubica.karvasova@europarl.europa.eu",
  "lubos.blaha@europarl.europa.eu",
  "veronika.ostrihonova@europarl.europa.eu",
  "ludovit.odor@europarl.europa.eu",
  "pablo.ariasecheverria@europarl.europa.eu",
  "pilar.delcastillo@europarl.europa.eu",
  "gabriel.mato@europarl.europa.eu",
  "francisco.millanmon@europarl.europa.eu",
  "antonio.lopezisturiz@europarl.europa.eu",
  "juanfernando.lopezaguilar@europarl.europa.eu",
  "iratxe.garcia-perez@europarl.europa.eu",
  "rosa.estaras@europarl.europa.eu",
  "javier.morenosanchez@europarl.europa.eu",
  "ana.miranda@europarl.europa.eu",
  "esther.herranzgarcia@europarl.europa.eu",
  "esteban.gonzalezpons@europarl.europa.eu",
  "alicia.homs@europarl.europa.eu",
  "jonas.fernandezalvarez@europarl.europa.eu",
  "javi.lopez@europarl.europa.eu",
  "juancarlos.girautavidal@europarl.europa.eu",
  "borja.gimenezlarraz@europarl.europa.eu",
  "isabel.benjumea@europarl.europa.eu",
  "juanignacio.zoidoalvarez@europarl.europa.eu",
  "javier.zarzalejos@europarl.europa.eu",
  "pernando.barrena@europarl.europa.eu",
  "laura.ballarincereza@europarl.europa.eu",
  "cesar.luena@europarl.europa.eu",
  "nacho.sanchezamor@europarl.europa.eu",
  "nicolas.casares@europarl.europa.eu",
  "lina.galvezmunoz@europarl.europa.eu",
  "hermann.tertsch@europarl.europa.eu",
  "jorge.buxadevillalba@europarl.europa.eu",
  "adrian.vazquezlazara@europarl.europa.eu",
  "cristina.maestre@europarl.europa.eu",
  "margarita.delapisa@europarl.europa.eu",
  "marcos.ros@europarl.europa.eu",
  "d.montserrat@europarl.europa.eu",
  "susana.solisperez@europarl.europa.eu",
  "diana.ribaiginer@europarl.europa.eu",
  "irene.montero@europarl.europa.eu",
  "estrella.galan@europarl.europa.eu",
  "jaume.asens@europarl.europa.eu",
  "alvise.perez@europarl.europa.eu",
  "luisalvise.perezfernandez@europarl.europa.eu",
  "oihane.agirregoitiamartinez@europarl.europa.eu",
  "elena.sanchomurillo@europarl.europa.eu",
  "isabel.serrasanchez@europarl.europa.eu",
  "diego.solierfernandez@europarl.europa.eu",
  "diego.solier@europarl.europa.eu",
  "fernando.navarrete@europarl.europa.eu",
  "jorge.martinfrias@europarl.europa.eu",
  "rosa.serranosierra@europarl.europa.eu",
  "jose.cepeda@europarl.europa.eu",
  "nora.juncogarcia@europarl.europa.eu",
  "nora.junco@europarl.europa.eu",
  "alma.ezcurra@europarl.europa.eu",
  "nicolas.pascualdelaparte@europarl.europa.eu",
  "idoia.mendia@europarl.europa.eu",
  "leire.pajiniraola@europarl.europa.eu",
  "vicent.marzaibanez@europarl.europa.eu",
  "mireia.borras@europarl.europa.eu",
  "mariacarmen.crespodiaz@europarl.europa.eu",
  "sandra.gomezlopez@europarl.europa.eu",
  "raul.delahoz@europarl.europa.eu",
  "maravillas.abadiajover@europarl.europa.eu",
  "hana.jalloulmuro@europarl.europa.eu",
  "elena.nevadodelcampo@europarl.europa.eu",
  "jonas.sjostedt@europarl.europa.eu",
  "johan.danielsson@europarl.europa.eu",
  "isabella.lovin@europarl.europa.eu",
  "karin.karlsbro@europarl.europa.eu",
  "jorgen.warborn@europarl.europa.eu",
  "tomas.tobe@europarl.europa.eu",
  "evin.incir@europarl.europa.eu",
  "arba.kokalari@europarl.europa.eu",
  "abir.alsahlani@europarl.europa.eu",
  "helene.fritzon@europarl.europa.eu",
  "charlie.weimers@europarl.europa.eu",
  "alice.kuhnke@europarl.europa.eu",
  "par.holmgren@europarl.europa.eu",
  "jessica.polfjard@europarl.europa.eu",
  "emma.wiesner@europarl.europa.eu",
  "adnan.dibrani@europarl.europa.eu",
  "beatrice.timgren@europarl.europa.eu",
  "hanna.gedin@europarl.europa.eu",
  "alice.teodorescumawe@europarl.europa.eu",
  "sofie.eriksson@europarl.europa.eu",
  "dick.erixon@europarl.europa.eu",
  "mircea-gheorghe.hava@europarl.europa.eu",
  "andras.laszlo@europarl.europa.eu",
  "jaume.asensllodra@europarl.europa.eu"

];

const EMAIL_SUBJECT = "Urgent Appeal: Protect At-Risk Detainees in Iran";

const EMAIL_BODY = `Dear Members of the European Parliament,

I am writing to urgently draw your attention to a serious and escalating human rights crisis in Iran. Nearly 2,000 individuals have been detained in connection with the nationwide protests of January 2026. These individuals face extreme risks: they have either been sentenced to death without fair and transparent trials, held incommunicado for extended periods, detained without formal charges, or reportedly subjected to torture and inhumane treatment.

These individuals have committed no crimes:
 • Peaceful protesters who participated in the January 8–9 demonstrations with empty hands and non-violent intentions.
 • Physicians and medical personnel who attempted to treat wounded civilians following government security actions.
 • Family members of those killed.
 • Individuals whose only “offense” was expressing their opinions online, before being forcibly taken from their homes to undisclosed locations.

From inside Iran, reliable information about their condition is extremely limited. Families are sometimes informed, without due process, that their loved ones have been executed. In some cases, families have been coerced into paying exorbitant sums of money simply to retrieve the bodies.

These actions are systematic and carried out under the authority of the Islamic Revolutionary Guard Corps (IRGC), a body recognized as a terrorist organization by international parliamentary bodies.

We respectfully but urgently call upon you to:
 1. Publicly acknowledge and condemn these violations.
 2. Provide political sponsorship and support for at-risk prisoners.
 3. Amplify the names and cases of detainees through European and international media channels.
 4. Raise these cases within the Subcommittee on Human Rights (DROI) and the Committee on Foreign Affairs (AFET).
 5. Demand immediate access for international monitoring bodies to Iranian detention facilities.
 6. Suspend all diplomatic engagement and invitations with representatives of the Islamic Republic of Iran in European and international forums.

The international community cannot continue normal diplomatic relations with a government that systematically imprisons, tortures, and executes its own people.

Time is critical. Coordinated and immediate European action can save lives. Silence, in contrast, enables impunity.

We urge you to act decisively and swiftly.

Thank you for your attention and your unwavering commitment to defending human rights.

Sincerely,`;

const MAX_PER_EMAIL = 61;
const userState = {}; 

// --------- Helpers ---------

function capitalizeWords(text) {
  return text?.toLowerCase().split(' ').filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || "User";
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

function ensureState(userId) {
  if (!userState[userId]) {
    const data = getData();
    const user = data.users.find(u => u.id === userId);
    if (user) {
      userState[userId] = {
        name: user.name,
        country: user.country,
        emailChunks: chunkArray(RECIPIENTS, MAX_PER_EMAIL),
        clickedPages: new Set(user.completedBatches || []),
        finalBody: EMAIL_BODY + `\n${user.name}\nFrom ${user.country}`
      };
    }
  }
  return userState[userId];
}

// --------- Page Rendering ---------

function renderEmailPage(ctx, state, index) {
  const chunks = state.emailChunks;
  if (!chunks || !chunks[index]) {
    return ctx.reply("Session expired. Please use /start.");
  }

  const total = chunks.length;
  const isLastPage = index === total - 1;

  const batch = chunks[index];
  const toEmail = batch[0];
  const bccEmails = batch.slice(1);

  const emailUrl =
    `${BASE_URL}?to=${encodeURIComponent(toEmail)}` +
    `&bcc=${encodeURIComponent(bccEmails.join(','))}` +
    `&sub=${encodeURIComponent(EMAIL_SUBJECT)}` +
    `&body=${encodeURIComponent(state.finalBody)}`;

  // ---------- Buttons ----------
  const buttons = [
    [Markup.button.url(`📧 Send Batch ${index + 1}`, emailUrl)]
  ];

  const nav = [];
  if (index > 0) {
    nav.push(Markup.button.callback('⬅️ Back', `PAGE_${index - 1}`));
  }
  if (index < total - 1) {
    nav.push(Markup.button.callback('Next ➡️', `PAGE_${index + 1}`));
  }
  if (nav.length) buttons.push(nav);

  if (isLastPage) {
    buttons.push([
      Markup.button.callback('🏁 Finish & Submit', 'FINISH_CAMPAIGN')
    ]);
  }

  // ---------- Progress (based on current batch index) ----------
  const current = index + 1;
  const percent = Math.round((current / total) * 100);

  const barLength = 10;
  const filledLength = Math.round((current / total) * barLength);

  const bar =
    "🟩".repeat(filledLength) +
    "⬜".repeat(barLength - filledLength);

  const text =
    `<b>Batch ${current} of ${total}</b>\n\n` +
    `Progress: ${bar} ${percent}%\n\n` +
    `${isLastPage
      ? '🎉 Final batch. After sending, tap <b>Finish & Submit</b>.'
      : '<i>Open draft, send the email, come back, then continue.</i>'}`;

  ctx.editMessageText(text, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard(buttons)
  }).catch(() => {});
}

// --------- Admin Panel: User List Pagination ---------

function renderUserListPage(ctx, page) {
  const data = getData();
  const pageSize = 10;
  const start = page * pageSize;
  const end = start + pageSize;
  const usersToShow = data.users.slice(start, end);
  const totalPages = Math.ceil(data.users.length / pageSize);

  let list = `👤 <b>Full User List:</b>\n\n`;
  
  usersToShow.forEach((u, i) => {
    const userTag = u.username ? `@${u.username}` : 'No Username';
    const date = u.startedAt ? new Date(u.startedAt).toLocaleString('en-GB') : 'Unknown';
    
    list += `${start + i + 1}. <b>${u.name}</b> (${userTag})\n` +
            `   🌍 ${u.country} | 📧 Sent: <b>${u.emailsSent || 0}</b>\n` +
            `   📅 Joined: <code>${date}</code>\n` +
            `   Finished: ${u.isFinished ? '✅' : '❌'}\n\n`;
  });

  const navButtons = [];
  if (page > 0) navButtons.push(Markup.button.callback('⬅️ Back', `ADMIN_USERS_${page - 1}`));
  if (end < data.users.length) navButtons.push(Markup.button.callback('Next ➡️', `ADMIN_USERS_${page + 1}`));

  const keyboard = navButtons.length > 0 ? Markup.inlineKeyboard([navButtons]) : Markup.inlineKeyboard([]);

  if (ctx.callbackQuery) {
    ctx.editMessageText(list, { parse_mode: 'HTML', ...keyboard }).catch(() => {});
  } else {
    ctx.reply(list, { parse_mode: 'HTML', ...keyboard });
  }
}

// --------- Admin Commands ---------

bot.command('stats', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  const data = getData();
  ctx.reply(`📊 <b>Global Stats</b>\n\nTotal Users: ${data.users.length}\nTotal Emails Sent: <b>${data.totalEmails}</b>`, { parse_mode: 'HTML' });
});

bot.command('users', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  renderUserListPage(ctx, 0);
});

bot.action(/ADMIN_USERS_(\d+)/, (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return ctx.answerCbQuery();
  renderUserListPage(ctx, parseInt(ctx.match[1]));
  ctx.answerCbQuery();
});

bot.command('broadcast', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  const msg = ctx.message.text.split(' ').slice(1).join(' ');
  if (!msg) return ctx.reply("Usage: /broadcast [Message]");
  
  const data = getData();
  ctx.reply(`📢 Sending to ${data.users.length} users...`);
  for (const user of data.users) {
    await bot.telegram.sendMessage(user.id, `📢 <b>Important Announcement:</b>\n\n${msg}`, { parse_mode: 'HTML' }).catch(() => {});
  }
  ctx.reply("✅ Broadcast finished.");
});

bot.command('remindall', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  const msg = ctx.message.text.split(' ').slice(1).join(' ');
  if (!msg) return ctx.reply("Usage: /remindall [Message]");
  
  const data = getData();
  const pending = data.users.filter(u => !u.isFinished);
  ctx.reply(`⏳ Reminding ${pending.length} pending users...`);
  for (const user of pending) {
    await bot.telegram.sendMessage(user.id, `🔔 <b>Action Required:</b>\n\n${msg}`, { parse_mode: 'HTML' }).catch(() => {});
  }
  ctx.reply("✅ Reminders finished.");
});

bot.command('remind', (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  const parts = ctx.message.text.split(' ');
  if (parts.length < 3) return ctx.reply("Usage: /remind [ID] [Message]");
  bot.telegram.sendMessage(parts[1], `🔔 <b>Direct Message:</b>\n\n${parts.slice(2).join(' ')}`, { parse_mode: 'HTML' })
    .then(() => ctx.reply("✅ Sent."))
    .catch(() => ctx.reply("❌ Error sending."));
});

// --------- User Flow ---------

bot.start((ctx) => {
  userState[ctx.from.id] = { step: 'intro', clickedPages: new Set() };

  ctx.replyWithPhoto(
    { source: './edam.jpg' },
    {
      caption: `⚖️ <b>STAND FOR JUSTICE. DEFEND HUMAN DIGNITY.</b>

🕊️ Iran Human Rights Action Bot

English: Thousands of individuals in Iran face execution, unlawful detention, and torture following peaceful protests. You can take action now by sending structured email appeals to European policymakers. The process takes less than two minutes, but the impact could help save lives.

To ensure your message carries proper weight and authenticity, we will personalize it with your official signature. Please enter your details below to begin the campaign.

فارسی: هزاران نفر در ایران پس از اعتراضات مسالمت‌آمیز با خطر اعدام، بازداشت غیرقانونی و شکنجه روبه‌رو هستند. شما می‌توانید همین حالا با ارسال ایمیل‌های رسمی به نمایندگان پارلمان اروپا اقدام کنید. این فرایند کمتر از دو دقیقه زمان می‌برد اما می‌تواند جان انسان‌ها را نجات دهد.

برای اینکه پیام شما از اعتبار و رسمیت لازم برخوردار باشد، آن را با امضای رسمی شما شخصی‌سازی می‌کنیم. لطفاً برای آغاز این کارزار، اطلاعات خود را در بخش زیر وارد کنید.`,
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('🚀 Start', 'START_CAMPAIGN')]
      ])
    }
  );
});

bot.action('START_CAMPAIGN', ctx => {
  ctx.answerCbQuery();
  userState[ctx.from.id].step = 'name';
  ctx.reply('✍️ Please enter your <b>full name</b>:', { parse_mode: 'HTML' });
});

bot.on('text', ctx => {
  const state = userState[ctx.from.id];
  if (!state) return;

  if (state.step === 'name') {
    state.name = capitalizeWords(ctx.message.text);
    state.step = 'country';
    ctx.reply('🌍 Your <b>country</b>:', { parse_mode: 'HTML' });
  } else if (state.step === 'country') {
    state.country = capitalizeWords(ctx.message.text);
    state.finalBody = EMAIL_BODY + `\n${state.name}\nFrom ${state.country}\nReference: X link showing thousands at risk as reports emerge of swift executions in Iran (https://x.com/kusha_alagband/status/2023495478462357979?s)`;
    state.emailChunks = chunkArray(RECIPIENTS, MAX_PER_EMAIL);
    state.step = 'sending';

    const data = getData();
    if (!data.users.find(u => u.id === ctx.from.id)) {
      data.users.push({ 
        id: ctx.from.id, 
        name: state.name, 
        country: state.country, 
        username: ctx.from.username, 
        startedAt: new Date().toISOString(), 
        emailsSent: 0, 
        isFinished: false,
        completedBatches: []
      });
      saveData(data);
    }
    
    // Notification for Admin
    if (ADMIN_ID) {
        bot.telegram.sendMessage(ADMIN_ID, `🔔🔔🔔New User🔔🔔🔔: ${state.name} (@${ctx.from.username || 'n/a'})`).catch(()=>{});
    }

    ctx.reply(`✅ Setup complete, <b>${state.name}</b>!
      Please send all batches. When you reach the final one,
      tap “🏁Finish & Submit.”`, { 
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([Markup.button.callback('📧 Open first batch', 'PAGE_0')]) 
    });
  }
});

bot.action(/CONFIRM_(\d+)/, ctx => {
  const index = parseInt(ctx.match[1]);
  const state = ensureState(ctx.from.id);
  if (!state || state.clickedPages.has(index)) return ctx.answerCbQuery();

  state.clickedPages.add(index);
  const count = state.emailChunks[index].length;
  const data = getData();
  
  data.totalEmails += count;
  const user = data.users.find(u => u.id === ctx.from.id);
  if (user) {
    user.emailsSent = (user.emailsSent || 0) + count;
    user.completedBatches = Array.from(state.clickedPages);
  }
  
  saveData(data);
  ctx.answerCbQuery(`Batch ${index + 1} logged!`);
  renderEmailPage(ctx, state, index);
});

bot.action(/PAGE_(\d+)/, ctx => {
  const index = parseInt(ctx.match[1]);
  const state = ensureState(ctx.from.id);
  if (!state) return ctx.answerCbQuery("Use /start.");
  ctx.answerCbQuery();
  renderEmailPage(ctx, state, index);
});

bot.action('FINISH_CAMPAIGN', ctx => {
  const data = getData();
  const user = data.users.find(u => u.id === ctx.from.id);
  if (user) {
    user.isFinished = true;
    user.emailsSent = RECIPIENTS.length;
    data.totalEmails += RECIPIENTS.length;
    saveData(data);
    ctx.editMessageText("🎉 <b>Thank you!</b>\nYou have finished all batches successfully.", { parse_mode: 'HTML' });
    if (ADMIN_ID) bot.telegram.sendMessage(ADMIN_ID, `🏁 <b>Completion Notification</b>\nUser: <b>${user.name}</b> (@${user.username || 'n/a'}) has finished the campaign!`, { parse_mode: 'HTML' });
  }
});

// ================== MENU CONFIGURATION ==================

// Set the menu for regular users
bot.telegram.setMyCommands([
  { command: 'start', description: '🚀 Start the campaign' }
]);

// Set a special menu ONLY for the Admin
bot.telegram.setMyCommands([
  { command: 'start', description: '🚀 Start campaign' },
  { command: 'stats', description: '📊 View Global Stats' },
  { command: 'users', description: '👤 View User List' },
  { command: 'pending', description: '⏳ View Pending Users' },
  { command: 'broadcast', description: '📢 Message Everyone' },
  { command: 'remindall', description: '🔔 Nudge Pending' }
], { 
  scope: { type: 'chat', chat_id: ADMIN_ID } 
});
bot.launch();

console.log('Bot is live and running.');
