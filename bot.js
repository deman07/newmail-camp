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

const RECIPIENTS = ['Chris.Elmore.mp@parliament.uk', 'Iain.duncansmith.mp@parliament.uk', 'Jeremy.wright.mp@parliament.uk', 'Samantha.dixon.mp@parliament.uk', 'aaron.callan@parliament.uk', 'abena.oppongasare.mp@parliament.uk', 'abrahamsd@parliament.uk', 'abtisam.mohamed.mp@parliament.uk', 'adam.dance.mp@parliament.uk', 'adam.jogee.mp@parliament.uk', 'adam.thompson.mp@parliament.uk', 'adnan.hussain.mp@parliament.uk', 'adrian.ramsay.mp@parliament.uk', 'afzal.khan.mp@parliament.uk', 'al.carns.mp@parliament.uk', 'al.pinkerton.mp@parliament.uk', 'alan.campbell.mp@parliament.uk', 'alan.gemmell.mp@parliament.uk', 'alan.mak.mp@parliament.uk', 'alan.strickland.mp@parliament.uk', 'alberto.costa.mp@parliament.uk', 'alec.shelbrooke.mp@parliament.uk', 'alex.baker.mp@parliament.uk', 'alex.ballinger.mp@parliament.uk', 'alex.barroscurtis.mp@parliament.uk', 'alex.brewer.mp@parliament.uk', 'alex.burghart.mp@parliament.uk', 'alex.daviesjones.mp@parliament.uk', 'alex.easton.mp@parliament.uk', 'alex.mayer.mp@parliament.uk', 'alex.mcintyre.mp@parliament.uk', 'alex.norris.mp@parliament.uk', 'alex.sobel.mp@parliament.uk', 'alice.macdonald.mp@parliament.uk', 'alicia.kearns.mp@parliament.uk', 'alison.bennett.mp@parliament.uk', 'alison.griffiths.mp@parliament.uk', 'alison.hume.mp@parliament.uk', 'alison.mcgovern.mp@parliament.uk', 'alison.taylor.mp@parliament.uk', 'alistair.strathern.mp@parliament.uk', 'allison.gardner.mp@parliament.uk', 'amanda.hack.mp@parliament.uk', 'amanda.martin.mp@parliament.uk', 'andrew.bowie.mp@parliament.uk', 'andrew.cooper.mp@parliament.uk', 'andrew.george.mp@parliament.uk', 'andrew.griffith.mp@parliament.uk', 'andrew.lewin.mp@parliament.uk', 'andrew.mitchell.mp@parliament.uk', 'andrew.pakes.mp@parliament.uk', 'andrew.ranger.mp@parliament.uk', 'andrew.rosindell.mp@parliament.uk', 'andrew.snowden.mp@parliament.uk', 'andrew.western.mp@parliament.uk', 'andy.macnae.mp@parliament.uk', 'andy.mcdonald.2nd@parliament.uk', 'angela.rayner.mp@parliament.uk', 'angus.macdonald.mp@parliament.uk', 'ann.davies.mp@parliament.uk', 'anna.dixon.mp@parliament.uk', 'anna.gelderd.mp@parliament.uk', 'anna.mcmorrin.mp@parliament.uk', 'anna.sabine.mp@parliament.uk', 'anna.turley.mp@parliament.uk', 'anneliese.dodds.mp@parliament.uk', 'anneliese.midgley.mp@parliament.uk', 'antonia.bance.mp@parliament.uk', 'aphra.brandreth.mp@parliament.uk', 'apsana.begum.mp@parliament.uk', 'ashley.dalton.mp@parliament.uk', 'ashley.fox.mp@parliament.uk', 'ayoub.khan.mp@parliament.uk', 'baggy.shanker.mp@parliament.uk', 'bambos.charalambous.mp@parliament.uk', 'barronj@parliament.uk', 'barry.gardiner.mp@parliament.uk', 'bayo.alaba.mp@parliament.uk', 'beccy.cooper.mp@parliament.uk', 'becky.gittins.mp@parliament.uk', 'bell.ribeiroaddy.mp@parliament.uk', 'ben.coleman.mp@parliament.uk', 'ben.goldsborough.mp@parliament.uk', 'ben.lake.mp@parliament.uk', 'ben.maguire.mp@parliament.uk', 'ben.obesejecty.mp@parliament.uk', 'ben.spencer.mp@parliament.uk', 'bennh@parliament.uk', 'bernard.jenkin.mp@parliament.uk', 'bill.esterson.mp@parliament.uk', 'blair.mcdougall.mp@parliament.uk', 'blake.stephenson.mp@parliament.uk', 'bob.blackman.mp@parliament.uk', 'bobby.dean.mp@parliament.uk', 'bradley.thomas.mp@parliament.uk', 'brendan.ohara.mp@parliament.uk', 'brian.leishman.mp@parliament.uk', 'brian.mathew.mp@parliament.uk', 'bridget.phillipson.mp@parliament.uk', 'callum.anderson.mp@parliament.uk', 'calum.miller.mp@parliament.uk', 'calvin.bailey.mp@parliament.uk', 'cameron.thomas.mp@parliament.uk', 'carla.denyer.mp@parliament.uk', 'carla.lockhart.mp@parliament.uk', 'carmichaela@parliament.uk', 'caroline.dinenage.mp@parliament.uk', 'caroline.johnson.mp@parliament.uk', 'caroline.nokes.mp@parliament.uk', 'caroline.voaden.mp@parliament.uk', 'carolyn.harris.mp@parliament.uk', 'cat.eccles.mp@parliament.uk', 'cat.smith.mp@parliament.uk', 'cathal.mallaghan.mp@parliament.uk', 'catherine.atkinson.mp@parliament.uk', 'catherine.fookes.mp@parliament.uk', 'catherine.mckinnell.mp@parliament.uk', 'catherine.west.mp@parliament.uk', 'charlie.dewhirst.mp@parliament.uk', 'charlie.maynard.mp@parliament.uk', 'charlotte.cane.mp@parliament.uk', 'charlotte.nichols.mp@parliament.uk', 'chi.onwurah.mp@parliament.uk', 'chopec@parliament.uk', 'chris.bloore.mp@parliament.uk', 'chris.bryant.mp@parliament.uk', 'chris.coghlan.mp@parliament.uk', 'chris.curtis.mp@parliament.uk', 'chris.evans.mp@parliament.uk', 'chris.hazzard.mp@parliament.uk', 'chris.hinchliff.mp@parliament.uk', 'chris.kane.mp@parliament.uk', 'chris.law.mp@parliament.uk', 'chris.mcdonald.mp@parliament.uk', 'chris.murray.mp@parliament.uk', 'chris.philp.mp@parliament.uk', 'chris.vince.mp@parliament.uk', 'chris.ward.mp@parliament.uk', 'chris.webb.mp@parliament.uk', 'christian.wakeford.mp@parliament.uk', 'christine.jardine.mp@parliament.uk', 'claire.coutinho.mp@parliament.uk', 'claire.hanna.mp@parliament.uk', 'claire.hazelgrove.mp@parliament.uk', 'claire.hughes.mp@parliament.uk', 'claire.young.mp@parliament.uk', 'cliftonbrowng@parliament.uk', 'clive.efford.mp@parliament.uk', 'clive.jones.mp@parliament.uk', 'clive.lewis.mp@parliament.uk', 'colum.eastwood.mp@parliament.uk', 'connor.naismith.mp@parliament.uk', 'connor.rand.mp@parliament.uk', 'coopery@parliament.uk', 'coxg@parliament.uk', 'daire.hughes.mp@parliament.uk', 'daisy.cooper.mp@parliament.uk', 'damian.hinds.mp@parliament.uk', 'damien.egan.mp@parliament.uk', 'dan.carden.mp@parliament.uk', 'dan.jarvis.mp@parliament.uk', 'dan.norris.mp@parliament.uk', 'dan.tomlinson.mp@parliament.uk', 'daniel.aldridge.mp@parliament.uk', 'daniel.francis.mp@parliament.uk', 'danny.beales.mp@parliament.uk', 'danny.chambers.mp@parliament.uk', 'darren.jones.mp@parliament.uk', 'darren.paffey.mp@parliament.uk', 'dave.doogan.mp@parliament.uk', 'dave.robertson.mp@parliament.uk', 'david.baines.mp@parliament.uk', 'david.burtonsampson.mp@parliament.uk', 'david.chadwick.mp@parliament.uk', 'david.davis.mp@parliament.uk', 'david.lammy.mp@parliament.uk', 'david.mundell.mp@parliament.uk', 'david.pintoduschinsky.mp@parliament.uk', 'david.reed.mp@parliament.uk', 'david.simmonds.mp@parliament.uk', 'david.smith.mp@parliament.uk', 'david.taylor.mp@parliament.uk', 'david.williams.mp@parliament.uk', 'dawn.butler.mp@parliament.uk', 'deirdre.costigan.mp@parliament.uk', 'derek.twigg.mp@parliament.uk', 'diane.abbott.office@parliament.uk', 'douglas.alexander.mp@parliament.uk', 'douglas.mcallister.mp@parliament.uk', 'eaglea@parliament.uk', 'ed.miliband.mp@parliament.uk', 'edward.argar.mp@parliament.uk', 'edward.davey.mp@parliament.uk', 'edward.leigh.mp@parliament.uk', 'edward.morello.mp@parliament.uk', 'elaine.stewart.mp@parliament.uk', 'ellie.chowns.mp@parliament.uk', 'ellie.reeves.mp@parliament.uk', 'elsie.blundell.mp@parliament.uk', 'emily.darlington.mp@parliament.uk', 'emma.foody.mp@parliament.uk', 'emma.hardy.mp@parliament.uk', 'emma.lewell.mp@parliament.uk', 'emma.reynolds.mp@parliament.uk', 'esther.mcvey.mp@parliament.uk', 'euan.stainbank.mp@parliament.uk', 'fabian.hamilton.mp@parliament.uk', 'feryal.clark.mp@parliament.uk', 'fleur.anderson.mp@parliament.uk', 'florence.eshalomi.mp@parliament.uk', 'frank.mcnally.mp@parliament.uk', 'fred.thomas.mp@parliament.uk', 'freddie.vanmierlo.mp@parliament.uk', 'gagan.mohindra.mp@parliament.uk', 'galerj@parliament.uk', 'gareth.bacon.mp@parliament.uk', 'gareth.davies.mp@parliament.uk', 'gareth.snell.mp@parliament.uk', 'gareth.thomas.mp@parliament.uk', 'gavin.robinson.mp@parliament.uk', 'gavin.williamson.mp@parliament.uk', 'gen.kitchen.mp@parliament.uk', 'george.freeman.mp@parliament.uk', 'georgia.gould.mp@parliament.uk', 'gerald.jones.mp@parliament.uk', 'gideon.amos.mp@parliament.uk', 'gill.furniss.mp@parliament.uk', 'gill.german.mp@parliament.uk', 'gordon.mckee.mp@parliament.uk', 'graeme.downie.mp@parliament.uk', 'graham.leadbitter.mp@parliament.uk', 'graham.stringer.mp@parliament.uk', 'grahame.morris.mp@parliament.uk', 'grahamstuartmp@parliament.uk', 'greg.smith.mp@parliament.uk', 'greg.stafford.mp@parliament.uk', 'gregor.poynton.mp@parliament.uk', 'gurinder.josan.mp@parliament.uk', 'gwynnea@parliament.uk', 'hamish.falconer.mp@parliament.uk', 'harpreet.uppal.mp@parliament.uk', 'harriet.cross.mp@parliament.uk', 'harriett.baldwin.mp@parliament.uk', 'hayesj@parliament.uk', 'heidi.alexander.mp@parliament.uk', 'helen.grant.mp@parliament.uk', 'helen.hayes.mp@parliament.uk', 'helen.maguire.mp@parliament.uk', 'helen.morgan.mp@parliament.uk', 'helen.whately.mp@parliament.uk', 'helena.dollimore.mp@parliament.uk', 'henry.tufnell.mp@parliament.uk', 'huntj@parliament.uk', 'ian.byrne.mp@parliament.uk', 'ian.lavery.mp@parliament.uk', 'ian.murray.mp@parliament.uk', 'ian.roome.mp@parliament.uk', 'ian.sollom.mp@parliament.uk', 'imogen.walker.mp@parliament.uk', 'imran.hussain.mp@parliament.uk', 'iqbal.mohamed.mp@parliament.uk', 'irene.campbell.mp@parliament.uk', 'jack.abbott.mp@parliament.uk', 'jack.rankin.mp@parliament.uk', 'jacob.collier.mp@parliament.uk', 'jade.botterill.mp@parliament.uk', 'jake.richards.mp@parliament.uk', 'james.cartlidge.mp@parliament.uk', 'james.cleverly.mp@parliament.uk', 'james.frith.mp@parliament.uk', 'james.maccleary.mp@parliament.uk', 'james.mcmurdock.mp@parliament.uk', 'james.murray.mp@parliament.uk', 'james.naish.mp@parliament.uk', 'james.wild.mp@parliament.uk', 'jamie.stone.mp@parliament.uk', 'janet.daby.mp@parliament.uk', 'jas.athwal.mp@parliament.uk', 'jayne.kirkham.mp@parliament.uk', 'jeevun.sandher.mp@parliament.uk', 'jeff.smith.mp@parliament.uk', 'jen.craft.mp@parliament.uk', 'jenny.riddellcarpenter.mp@parliament.uk', 'jeremy.corbyn.mp@parliament.uk', 'jerome.mayhew.mp@parliament.uk', 'jess.asato.mp@parliament.uk', 'jess.brownfuller.mp@parliament.uk', 'jess.phillips.mp@parliament.uk', 'jesse.norman.mp@parliament.uk', 'jessica.toale.mp@parliament.uk', 'jim.allister.mp@parliament.uk', 'jim.dickson.mp@parliament.uk', 'jim.mcmahon.mp@parliament.uk', 'jim.shannon.mp@parliament.uk', 'jo.platt.mp@parliament.uk', 'jo.stevens.mp@parliament.uk', 'jo.white.mp@parliament.uk', 'joani.reid.mp@parliament.uk', 'jodie.gosling.mp@parliament.uk', 'joe.morris.mp@parliament.uk', 'joe.powell.mp@parliament.uk', 'joe.robertson.mp@parliament.uk', 'johanna.baxter.mp@parliament.uk', 'john.cooper.mp@parliament.uk', 'john.finucane.mp@parliament.uk', 'john.glen.mp@parliament.uk', 'john.grady.mp@parliament.uk', 'john.healey.mp@parliament.uk', 'john.lamont.mp@parliament.uk', 'john.milne.mp@parliament.uk', 'john.slinger.mp@parliament.uk', 'john.whitby.mp@parliament.uk', 'john.whittingdale.mp@parliament.uk', 'johnsond@parliament.uk', 'jon.pearce.mp@parliament.uk', 'jonathan.brash.mp@parliament.uk', 'jonathan.davies.mp@parliament.uk', 'jonathan.hinder.mp@parliament.uk', 'jonathan.reynolds.mp@parliament.uk', 'josh.babarinde.mp@parliament.uk', 'josh.dean.mp@parliament.uk', 'josh.fentonglynn.mp@parliament.uk', 'josh.macalister.mp@parliament.uk', 'josh.newbury.mp@parliament.uk', 'josh.simons.mp@parliament.uk', 'joshua.reynolds.mp@parliament.uk', 'joy.morrissey.mp@parliament.uk', 'judith.cummins.mp@parliament.uk', 'julia.buckley.mp@parliament.uk', 'julia.lopez.mp@parliament.uk', 'julian.smith.mp@parliament.uk', 'julie.minns.mp@parliament.uk', 'juliet.campbell.mp@parliament.uk', 'justin.madders.mp@parliament.uk', 'kanishka.narayan.mp@parliament.uk', 'karen.bradley.mp@parliament.uk', 'karin.smyth.mp@parliament.uk', 'karl.turner.mp@parliament.uk', 'kate.dearden.mp@parliament.uk', 'kate.osamor.mp@parliament.uk', 'kate.osborne.mp@parliament.uk', 'katie.lam.mp@parliament.uk', 'katie.white.mp@parliament.uk', 'katrina.murray.mp@parliament.uk', 'keir.mather.mp@parliament.uk', 'keir.starmer.mp@parliament.uk', 'kemi.badenoch.mp@parliament.uk', 'kenneth.stevenson.mp@parliament.uk', 'kerry.mccarthy.mp@parliament.uk', 'kevin.bonavia.mp@parliament.uk', 'kevin.hollinrake.mp@parliament.uk', 'kevin.mckenna.mp@parliament.uk', 'kieran.mullan.mp@parliament.uk', 'kim.johnson.mp@parliament.uk', 'kim.leadbeater.mp@parliament.uk', 'kirith.entwistle.mp@parliament.uk', 'kirsteen.sullivan.mp@parliament.uk', 'kirsty.blackman.mp@parliament.uk', 'kirsty.mcneill.mp@parliament.uk', 'kit.malthouse.mp@parliament.uk', 'laura.kyrkesmith.mp@parliament.uk', 'laura.trott.mp@parliament.uk', 'lauren.edwards.mp@parliament.uk', 'lauren.sullivan.mp@parliament.uk', 'laurence.turner.mp@parliament.uk', 'layla.moran.mp@parliament.uk', 'lee.anderson.mp@parliament.uk', 'lee.barron.mp@parliament.uk', 'lee.dillon.mp@parliament.uk', 'lee.pitcher.mp@parliament.uk', 'leigh.ingham.mp@parliament.uk', 'lewis.atkinson.mp@parliament.uk', 'lewis.cocking.mp@parliament.uk', 'liam.byrne.mp@parliament.uk', 'liam.conlon.mp@parliament.uk', 'lilian.greenwood.mp@parliament.uk', 'lillian.jones.mp@parliament.uk', 'lincoln.jopp.mp@parliament.uk', 'lindsay.hoyle.mp@parliament.uk', 'linsey.farnsworth.mp@parliament.uk', 'lisa.nandy.mp@parliament.uk', 'lisa.smart.mp@parliament.uk', 'liz.jarvis.mp@parliament.uk', 'liz.kendall.mp@parliament.uk', 'liz.savilleroberts.mp@parliament.uk', 'liz.twist.mp@parliament.uk', 'lizzi.collinge.mp@parliament.uk', 'llinos.medi.mp@parliament.uk', 'lloyd.hatton.mp@parliament.uk', 'lola.mcevoy.mp@parliament.uk', 'lorraine.beavers.mp@parliament.uk', 'louie.french.mp@parliament.uk', 'louise.haigh.mp@parliament.uk', 'louise.jones.mp@parliament.uk', 'lucy.rigby.mp@parliament.uk', 'luke.akehurst.mp@parliament.uk', 'luke.charters.mp@parliament.uk', 'luke.evans.mp@parliament.uk', 'luke.murphy.mp@parliament.uk', 'luke.myer.mp@parliament.uk', 'luke.pollard.mp@parliament.uk', 'luke.taylor.mp@parliament.uk', 'manuela.perteghella.mp@parliament.uk', 'margaret.mullane.mp@parliament.uk', 'maria.eagle.mp@parliament.uk', 'marie.goldman.mp@parliament.uk', 'marie.rimmer.mp@parliament.uk', 'marie.tidball.mp@parliament.uk', 'mark.ferguson.mp@parliament.uk', 'mark.francois.mp@parliament.uk', 'mark.garnier.mp@parliament.uk', 'mark.hendrick.mp@parliament.uk', 'mark.pritchard.mp@parliament.uk', 'mark.sewards.mp@parliament.uk', 'markus.campbellsavours.mp@parliament.uk', 'marsha.decordova.mp@parliament.uk', 'martin.mccluskey.mp@parliament.uk', 'martin.rhodes.mp@parliament.uk', 'martin.vickers.mp@parliament.uk', 'martin.wrigley.mp@parliament.uk', 'mary.creagh.mp@parliament.uk', 'mary.foy.mp@parliament.uk', 'mary.glindon.mp@parliament.uk', 'matt.bishop.mp@parliament.uk', 'matt.rodda.mp@parliament.uk', 'matt.turmaine.mp@parliament.uk', 'matt.vickers.mp@parliament.uk', 'matt.western.mp@parliament.uk', 'matthew.patrick.mp@parliament.uk', 'matthew.pennycook.mp@parliament.uk', 'maureen.burke.mp@parliament.uk', 'max.wilkinson.mp@parliament.uk', 'maya.ellis.mp@parliament.uk', 'mcdonaghs@parliament.uk', 'mcdonnellj@parliament.uk', 'mcfaddenp@parliament.uk', 'meghilliermp@parliament.uk', 'mel.stride.mp@parliament.uk', 'melanie.onn.mp@parliament.uk', 'melanie.ward.mp@parliament.uk', 'miatta.fahnbulleh.mp@parliament.uk', 'michael.payne.mp@parliament.uk', 'michael.shanks.mp@parliament.uk', 'michael.wheeler.mp@parliament.uk', 'michelle.scrogham.mp@parliament.uk', 'michelle.welsh.mp@parliament.uk', 'mike.kane.mp@parliament.uk', 'mike.martin.mp@parliament.uk', 'mike.reader.mp@parliament.uk', 'mike.tapp.mp@parliament.uk', 'mike.wood.mp@parliament.uk', 'mims.davies.mp@parliament.uk', 'mohammad.yasin.mp@parliament.uk', 'monica.harding.mp@parliament.uk', 'mordenj@parliament.uk', 'munira.wilson.mp@parliament.uk', 'murrisona@parliament.uk', 'nadia.whittome.mp@parliament.uk', 'natalie.fleet.mp@parliament.uk', 'natasha.irons.mp@parliament.uk', 'naushabah.khan.mp@parliament.uk', 'navendu.mishra.mp@parliament.uk', 'naz.shah.mp@parliament.uk', 'neil.coyle.mp@parliament.uk', 'neil.duncanjordan.mp@parliament.uk', 'neil.hudson.mp@parliament.uk', 'neil.obrien.mp@parliament.uk', 'neil.shastrihurst.mp@parliament.uk', 'nesil.caliskan.mp@parliament.uk', 'nia.griffith.mp@parliament.uk', 'nic.dakin.mp@parliament.uk', 'nick.smith.mp@parliament.uk', 'nick.thomassymonds.mp@parliament.uk', 'nick.timothy.mp@parliament.uk', 'nigel.farage.mp@parliament.uk', 'nigel.huddleston.mp@parliament.uk', 'noah.law.mp@parliament.uk', 'nusrat.ghani.mp@parliament.uk', 'officeofclivebettsmp@parliament.uk', 'oliver.dowden.mp@parliament.uk', 'oliver.ryan.mp@parliament.uk', 'olivia.bailey.mp@parliament.uk', 'olivia.blake.mp@parliament.uk', 'olly.glover.mp@parliament.uk', 'pam.cox.mp@parliament.uk', 'pamela.nash.mp@parliament.uk', 'pat.cullen.mp@parliament.uk', 'patricia.ferguson.mp@parliament.uk', 'patrick.hurley.mp@parliament.uk', 'patrick.spencer.mp@parliament.uk', 'paul.davies.mp@parliament.uk', 'paul.foster.mp@parliament.uk', 'paul.holmes.mp@parliament.uk', 'paul.kohler.mp@parliament.uk', 'paul.maskey.mp@parliament.uk', 'paul.waugh.mp@parliament.uk', 'paula.barker.mp@parliament.uk', 'paulette.hamilton.mp@parliament.uk', 'perran.moon.mp@parliament.uk', 'pete.wishart.mp@parliament.uk', 'peter.bedford.mp@parliament.uk', 'peter.dowd.mp@parliament.uk', 'peter.fortune.mp@parliament.uk', 'peter.kyle.mp@parliament.uk', 'peter.lamb.mp@parliament.uk', 'peter.prinsley.mp@parliament.uk', 'peter.swallow.mp@parliament.uk', 'phil.brickell.mp@parliament.uk', 'pippa.heylings.mp@parliament.uk', 'polly.billington.mp@parliament.uk', 'preet.gill.mp@parliament.uk', 'rachael.maskell.mp@parliament.uk', 'rachel.blake.mp@parliament.uk', 'rachel.gilmour.mp@parliament.uk', 'rachel.hopkins.mp@parliament.uk', 'rachel.reeves.mp@parliament.uk', 'rachel.taylor.mp@parliament.uk', 'rebecca.harris.mp@parliament.uk', 'rebecca.longbailey.mp@parliament.uk', 'rebecca.paul.mp@parliament.uk', 'rebecca.smith.mp@parliament.uk', 'richard.baker.mp@parliament.uk', 'richard.foord.mp@parliament.uk', 'richard.fuller.mp@parliament.uk', 'richard.holden.mp@parliament.uk', 'richard.quigley.mp@parliament.uk', 'richard.tice.mp@parliament.uk', 'rishi.sunak.mp@parliament.uk', 'robbie.moore.mp@parliament.uk', 'robert.jenrick.mp@parliament.uk', 'robin.swann.mp@parliament.uk', 'rosena.allinkhan.mp@parliament.uk', 'rosie.duffield.mp@parliament.uk', 'rosie.wrighting.mp@parliament.uk', 'roz.savage.mp@parliament.uk', 'rupa.huq.mp@parliament.uk', 'rupert.lowe.mp@parliament.uk', 'rushanara.ali.mp@parliament.uk', 'ruth.jones.mp@parliament.uk', 'ruthcadburymp@parliament.uk', 'sadik.alhassan.mp@parliament.uk', 'sally.jameson.mp@parliament.uk', 'sam.carling.mp@parliament.uk', 'sam.rushworth.mp@parliament.uk', 'samantha.niblett.mp@parliament.uk', 'saqib.bhatti@parliament.uk', 'sarah.bool.mp@parliament.uk', 'sarah.champion.mp@parliament.uk', 'sarah.coombes.mp@parliament.uk', 'sarah.dyke.mp@parliament.uk', 'sarah.edwards.mp@parliament.uk', 'sarah.gibson.mp@parliament.uk', 'sarah.green.mp@parliament.uk', 'sarah.hall.mp@parliament.uk', 'sarah.jones.mp@parliament.uk', 'sarah.olney.mp@parliament.uk', 'sarah.owen.mp@parliament.uk', 'sarah.pochin.mp@parliament.uk', 'sarah.russell.mp@parliament.uk', 'sarah.sackman.mp@parliament.uk', 'sarah.smith.mp@parliament.uk', 'satvir.kaur.mp@parliament.uk', 'scott.arthur.mp@parliament.uk', 'seamus.logan.mp@parliament.uk', 'sean.woodcock.mp@parliament.uk', 'seema.malhotra.mp@parliament.uk', 'shabana.mahmood.mp@parliament.uk', 'sharon.hodgson.mp@parliament.uk', 'shaun.davies.mp@parliament.uk', 'shivani.raja.mp@parliament.uk', 'shockat.adam.mp@parliament.uk', 'sian.berry.mp@parliament.uk', 'simon.hoare.mp@parliament.uk', 'simon.lightwood.mp@parliament.uk', 'simon.opher.mp@parliament.uk', 'slaughtera@parliament.uk', 'sojan.joseph.mp@parliament.uk', 'sonia.kumar.mp@parliament.uk', 'sorcha.eastwood.mp@parliament.uk', 'steff.aquarone.mp@parliament.uk', 'stella.creasy.mp@parliament.uk', 'stephanie.peacock.mp@parliament.uk', 'stephen.barclay.mp@parliament.uk', 'stephen.doughty.mp@parliament.uk', 'stephen.flynn.mp@parliament.uk', 'stephen.gethins.mp@parliament.uk', 'stephen.kinnock.mp@parliament.uk', 'stephen.morgan.mp@parliament.uk', 'steve.darling.mp@parliament.uk', 'steve.race.mp@parliament.uk', 'steve.reed.mp@parliament.uk', 'steve.witherden.mp@parliament.uk', 'steve.yemm.mp@parliament.uk', 'stuart.anderson.mp@parliament.uk', 'stuart.andrew.mp@parliament.uk', 'suella.braverman.mp@parliament.uk', 'sureena.brackenridge.mp@parliament.uk', 'susan.murray.mp@parliament.uk', 'swayned@parliament.uk', 'tahir.ali.mp@parliament.uk', 'taiwo.owatemi.mp@parliament.uk', 'tamim@parliament.uk', 'tan.dhesi.mp@parliament.uk', 'terry.jermy.mp@parliament.uk', 'tessa.munt.mp@parliament.uk', 'thornberrye@parliament.uk', 'tim.farron.mp@parliament.uk', 'tim.roca.mp@parliament.uk', 'timmss@parliament.uk', 'toby.perkins.mp@parliament.uk', 'tom.collins.mp@parliament.uk', 'tom.gordon.mp@parliament.uk', 'tom.hayes.mp@parliament.uk', 'tom.morrison.mp@parliament.uk', 'tom.rutland.mp@parliament.uk', 'tom.tugendhat.mp@parliament.uk', 'tonia.antoniazzi.mp@parliament.uk', 'tony.vaughan.mp@parliament.uk', 'torcuil.crichton.mp@parliament.uk', 'torsten.bell.mp@parliament.uk', 'tracy.gilbert.mp@parliament.uk', 'trickettj@parliament.uk', 'tristan.osborne.mp@parliament.uk', 'tulip.siddiq.mp@parliament.uk', 'uma.kumaran.mp@parliament.uk', 'valerie.vaz.mp@parliament.uk', 'vicky.foxcroft.mp@parliament.uk', 'victoria.collins.mp@parliament.uk', 'vikki.slade.mp@parliament.uk', 'warinder.juss.mp@parliament.uk', 'wendy.chamberlain.mp@parliament.uk', 'wendy.morton.mp@parliament.uk', 'wera.hobhouse.mp@parliament.uk', 'wes.streeting.mp@parliament.uk', 'will.forster.mp@parliament.uk', 'will.stone.mp@parliament.uk', 'withammp@parliament.uk', 'yasmin.qureshi.mp@parliament.uk', 'yuan.yang.mp@parliament.uk', 'zarah.sultana.mp@parliament.uk', 'zoe.franklin.mp@parliament.uk', 'zubir.ahmed.mp@parliament.uk', 'james.asser.mp@parliament.uk']

const EMAIL_SUBJECT = "Stop Calling U.S. Strikes on the Islamic Regime a War – Protect Iranian Civilians";

const EMAIL_BODY = `Dear Sir or Madam,



I am writing to you on behalf of members of the Iranian diaspora in the United Kingdom who are profoundly alarmed by the escalating and systematic violence being carried out by the Islamic Republic of Iran against its own people.



We are deeply concerned by the framing of recent U.S. strikes on regime targets as a “war.” When a regime wages violence against its own citizens, international action in solidarity with those citizens is not war—it is accountability. It is the defense of fundamental human rights. It is the protection of civilians facing state brutality.please  Stop calling U.S. strikes on the Islamic regime a war.



Iran is enduring what many believe to be crimes against humanity. In January 2026 alone, reports indicate that more than 36,500 civilians were killed in response to peaceful protests. Mothers are burying their children. Students and professors are being detained, tortured and executed. Women continue to be targeted for demanding the most basic freedoms. Millions of Iranians have united behind the historic Lion and Sun flag as a symbol of a free and democratic Iran, rejecting the current regime and calling for peaceful transition.



We therefore respectfully urge the UK Government to take the following actions:

 • Formally designate the Islamic Revolutionary Guard Corps (IRGC) as a terrorist organisation

 • Publicly support a peaceful democratic transition in Iran

 • Recognise the Lion and Sun as the symbol of the Iranian people’s democratic aspirations

 • Implement humanitarian protective measures, including consideration of civilian no-fly zones over protest cities

 • Safeguard and expand access to free communication channels to ensure the voices of the Iranian people are not silenced



The United Kingdom has a proud history of standing against tyranny and in defense of democratic values. We ask that you stand firmly on the side of the Iranian people at this critical moment.



Iran does not need indifference. It needs principled leadership.



Yours sincerely,

`;

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
    { source: './parl.png' },
    {
      caption: `⚖️ <b>TAKE A STAND FOR HUMAN RIGHTS.</b>

🕊️ Iran Advocacy Action Bot

English:
This campaign enables you to send a formal, structured appeal to UK representatives regarding the escalating human rights crisis in Iran.

Your message calls for accountability, protection of civilians, and support for democratic principles. It will be delivered in a professional diplomatic format suitable for policymakers.

The process takes less than two minutes. Your participation strengthens the collective voice of the Iranian diaspora and supporters of human dignity.

To personalise your letter with an official signature, please enter your details below to begin.

فارسی:
این کارزار به شما امکان می‌دهد یک نامه رسمی و ساختارمند در خصوص بحران حقوق بشر در ایران برای نمایندگان بریتانیا ارسال کنید.

این پیام خواستار پاسخگویی، حمایت از غیرنظامیان و پشتیبانی از اصول دموکراتیک است و در قالبی رسمی و مناسب برای مقامات ارسال می‌شود.

این فرایند کمتر از دو دقیقه زمان می‌برد و مشارکت شما صدای جمعی ایرانیان و حامیان حقوق بشر را تقویت می‌کند.

برای شخصی‌سازی نامه با امضای رسمی خود، لطفاً اطلاعات خود را در بخش زیر وارد کنید.`,
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
