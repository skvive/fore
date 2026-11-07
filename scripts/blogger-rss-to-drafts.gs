/**
 * 더포레 RSS → Blogger 임시글 생성용 Google Apps Script.
 * Blogger Advanced Service v3 (Services > Blogger) and GOOGLE ACCOUNT permission required.
 * Required Script Properties: FORET_BLOG_ID and FORET_APPROVED_GUIDS (comma-separated canonical GUID allowlist).
 * It deliberately DOES NOT auto-publish medical content. Staff review drafts before publication.
 */
function syncApprovedForetFeed() {
  const props = PropertiesService.getScriptProperties();
  const blogId = props.getProperty('FORET_BLOG_ID');
  const allowed = new Set((props.getProperty('FORET_APPROVED_GUIDS') || '').split(',').map(x=>x.trim()).filter(Boolean));
  if (!blogId || !allowed.size) throw Error('Blogger ID and editorial-approved GUID list are required.');
  const response = UrlFetchApp.fetch('https://fore.lexid.site/rss.xml', {muteHttpExceptions:true,followRedirects:true});
  if (response.getResponseCode() !== 200) throw Error('RSS unavailable: '+response.getResponseCode());
  const channel = XMLService.parse(response.getContentText()).getRootElement().getChild('channel');
  if (!channel) throw Error('Invalid RSS channel');
  let created = 0;
  channel.getChildren('item').forEach(item => {
    const guid = item.getChildText('guid');
    if (!guid || !allowed.has(guid)) return;
    const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,guid).map(b=>('0'+(b&255).toString(16)).slice(-2)).join('');
    if (props.getProperty('FORET_SENT_'+hash)) return;
    const title = item.getChildText('title') || '건강정보';
    const description = item.getChildText('description') || '';
    const safeText = String(description).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const safeLink = String(item.getChildText('link')||'').replace(/"/g,'%22');
    const html = '<p>'+safeText+'</p><p><a href="'+safeLink+'">공식 사이트 원문 확인</a></p><p>의료·보험 제도는 개별 사례별로 확인해야 합니다.</p>';
    const result = Blogger.Posts.insert({kind:'blogger#post',title:title,content:html},blogId,{isDraft:true});
    if (!result || !result.id) throw Error('Blogger draft creation failed for '+guid);
    props.setProperty('FORET_SENT_'+hash,String(result.id));
    created++;
  });
  console.log('Created drafts: '+created);
}
