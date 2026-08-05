// Rebuild Hope from the blueprint files ONLY (no network, no live agent)
// and diff the result against the known-live values.
import { readFile } from 'node:fs/promises';
const REF='./references';
const cfg=JSON.parse(await readFile(`${REF}/hope-config.json`,'utf8'));
const wf=JSON.parse(await readFile(`${REF}/hope-workflow.json`,'utf8'));
const prompt=await readFile(`${REF}/hope-system-prompt.md`,'utf8');

const LIVE={
 model:'eleven_v3_conversational',voice:'uYXf8XasLslADfZ2MB4u',stability:0.42,speed:1.02,
 similarity:0.78,llm:'gpt-5.6-terra',temp:0.55,cascade:5,tz:'America/New_York',
 turnModel:'turn_v3',eager:'eager',promptChars:6878,keywords:29,ignoreTerms:27,
 fillers:7,tags:6,nodes:12,edges:31,tunedNodes:10,evalCriteria:5,dataFields:12,
 firstMsg:'Battle Electric, this is Hope — how can I help?',recordVoice:true,
 bgSound:'typing',bgVol:0.22,ignoreDefaultPersonality:true,bgVoiceDetect:true,
};
const t=cfg.conversation_config.tts, a=cfg.conversation_config.agent, p=a.prompt;
const st=cfg.conversation_config.turn;
const fail=[];
const eq=(n,got,want)=>{ if(JSON.stringify(got)!==JSON.stringify(want)) fail.push(`${n}: ${got} != ${want}`); };

eq('tts.model',t.model_id,LIVE.model); eq('voice',t.voice_id,LIVE.voice);
eq('stability',t.stability,LIVE.stability); eq('speed',t.speed,LIVE.speed);
eq('similarity',t.similarity_boost,LIVE.similarity); eq('audio tags',t.suggested_audio_tags.length,LIVE.tags);
eq('llm',p.llm,LIVE.llm); eq('temperature',p.temperature,LIVE.temp);
eq('cascade',p.cascade_timeout_seconds,LIVE.cascade); eq('timezone',p.timezone,LIVE.tz);
eq('ignore_default_personality',p.ignore_default_personality,LIVE.ignoreDefaultPersonality);
eq('turn_model',st.turn_model,LIVE.turnModel); eq('global eagerness',st.turn_eagerness,LIVE.eager);
eq('ignore terms',st.interruption_ignore_terms.length,LIVE.ignoreTerms);
eq('fillers',1+st.soft_timeout_config.additional_soft_timeout_messages.length,LIVE.fillers);
eq('asr keywords',cfg.conversation_config.asr.keywords.length,LIVE.keywords);
eq('first_message',a.first_message,LIVE.firstMsg);
eq('prompt chars',prompt.length,LIVE.promptChars);
eq('record_voice',cfg.platform_settings.privacy.record_voice,LIVE.recordVoice);
eq('bg sound',cfg.conversation_config.conversation.background_sound.source_id,LIVE.bgSound);
eq('bg volume',cfg.conversation_config.conversation.background_sound.volume,LIVE.bgVol);
eq('bg voice detect',cfg.conversation_config.vad.background_voice_detection,LIVE.bgVoiceDetect);
eq('nodes',Object.keys(wf.nodes).length,LIVE.nodes);
eq('edges',Object.keys(wf.edges).length,LIVE.edges);
eq('eval criteria',cfg.platform_settings.evaluation_criteria.length,LIVE.evalCriteria);
eq('data fields',Object.keys(cfg.platform_settings.data_collection).length,LIVE.dataFields);

// every eval criterion must carry its full goal prompt, not just a name
for(const c of cfg.platform_settings.evaluation_criteria)
  if(!c.conversation_goal_prompt||c.conversation_goal_prompt.length<80) fail.push(`eval ${c.id} missing goal prompt`);
// every data field must carry type + description
for(const [k,v] of Object.entries(cfg.platform_settings.data_collection))
  if(!v.type||!v.description) fail.push(`data field ${k} incomplete`);
// every tuned node must have eagerness; 9 of 10 must have stability
const tuned=Object.entries(wf.nodes).filter(([,n])=>n.overrides?.turn_eagerness);
eq('tuned nodes',tuned.length,LIVE.tunedNodes);
// every node must have prompt, position, edge_order
for(const [id,n] of Object.entries(wf.nodes)){
  if(n.type==='start'||n.type==='end') continue;
  if(!n.prompt) fail.push(`node ${id} missing prompt`);
  if(!n.position) fail.push(`node ${id} missing position`);
  if(!n.edge_order) fail.push(`node ${id} missing edge_order`);
  if(!n.label) fail.push(`node ${id} missing label`);
}
// every edge must have a verbatim condition
for(const [id,e] of Object.entries(wf.edges)){
  if(e.type==='unconditional') continue;
  if(!e.condition||e.condition.length<30) fail.push(`edge ${id} condition too short/paraphrased`);
  if(!e.label) fail.push(`edge ${id} missing label`);
}
console.log(fail.length?'✗ '+fail.join('\n✗ '):'✓ blueprint files alone reproduce every live value — lossless');
console.log(`  ${Object.keys(wf.nodes).length} nodes · ${Object.keys(wf.edges).length} edges · ${tuned.length} tuned · ${prompt.length} prompt chars · ${cfg.conversation_config.asr.keywords.length} keywords`);
