const { useState, useEffect, useMemo, useRef } = React;

const I = {
Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
Check: '<polyline points="20 6 9 17 4 12"/>',
CheckCircle2: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
Edit2: '<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
Trash2: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
Moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
Sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
Sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/>',
Calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
ChevronLeft: '<path d="m15 18-6-6 6-6"/>',
ChevronRight: '<path d="m9 18 6-6-6-6"/>',
Archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
CalendarDays: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/>',
Upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
Loader2: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
AlertCircle: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
Share2: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
CalendarPlus: '<path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M3 10h18"/><path d="M16 19h6"/><path d="M19 16v6"/>',
BookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
Wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
Target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
RotateCw: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
MapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
Bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
BellOff: '<path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"/><path d="M17 17H3s3-2 3-9a4.7 4.7 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="m2 2 20 20"/>',
Zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
TrendingUp: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
Trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
};

const Icon = ({ name, size = 16, strokeWidth = 2, style, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
       fill="none" stroke={color || "currentColor"} strokeWidth={strokeWidth}
       strokeLinecap="round" strokeLinejoin="round"
       style={{ flexShrink: 0, ...style }}
       dangerouslySetInnerHTML={{ __html: I[name] || '' }} />
);

const QUOTES = [
  "כל מומחה היה פעם מתחיל",
  "הצלחה היא סכום של מאמצים קטנים שחוזרים על עצמם",
  "המחר שייך למי שמתכונן אליו היום",
  "השקעה בידע משלמת את הריבית הטובה ביותר",
  "אל תחכה. הזמן לעולם לא יהיה הזמן הנכון",
  "עוד עמוד, עוד שאלה, עוד צעד קדימה",
  "הצעד הראשון הוא תמיד הקשה ביותר",
  "כל יום הוא הזדמנות להיות גרסה טובה יותר",
  "מי שזורע ידע קוצר עתיד",
  "המסע של אלף קילומטרים מתחיל בצעד אחד",
  "אין קיצור דרך למקום ששווה להגיע אליו",
  "ללכת מכישלון לכישלון בלי לאבד התלהבות",
];

const HEBREW_DAYS = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
const HEBREW_MONTHS = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];

const QUESTIONS = {
math:[{q:'נוסחת השורש של משוואה ריבועית?',a:'x = (-b ± √(b²-4ac)) / 2a'},{q:'הנגזרת של x^n',a:'n·x^(n-1)'},{q:'אינטגרל של 1/x',a:'ln|x| + C'},{q:'משפט פיתגורס',a:'a² + b² = c²'},{q:'שטח עיגול',a:'π·r²'},{q:'היקף עיגול',a:'2π·r'},{q:'sin(30°)',a:'1/2'},{q:'cos(60°)',a:'1/2'},{q:'מרחק בין שתי נקודות',a:'√((x₂-x₁)² + (y₂-y₁)²)'},{q:'סכום סדרה חשבונית',a:'Sn = n·(a₁+aₙ)/2'}],
english:[{q:'Past perfect',a:'had + V3 (had eaten)'},{q:'Present perfect',a:'have/has + V3'},{q:'Conditional Type 2',a:'If + Past Simple, would + V1'},{q:'"Despite" vs "Although"',a:'Despite + noun, Although + clause'},{q:'"give up"',a:'לוותר'},{q:'"look up"',a:'לחפש במילון'},{q:'Few vs Little',a:'Few = countable, Little = uncountable'},{q:'"Hit the books"',a:'ללמוד קשה'},{q:'Reported speech: "I am tired"',a:'He said he was tired'},{q:'good comparison',a:'good - better - best'}],
history:[{q:'הקונגרס הציוני הראשון',a:'1897, באזל, הרצל'},{q:'הצהרת בלפור',a:'2 בנובמבר 1917'},{q:'הקמת מדינת ישראל',a:'14 במאי 1948'},{q:'מלחמת ששת הימים',a:'יוני 1967'},{q:'מלחמת יום הכיפורים',a:'אוקטובר 1973'},{q:'החלטת חלוקה',a:'29 בנובמבר 1947'},{q:'עליית הנאצים',a:'30 בינואר 1933'},{q:'מלחמת העולם השנייה',a:'1939-1945'},{q:'ראש ממשלה ראשון',a:'דוד בן-גוריון'},{q:'מבצע קדש',a:'1956'}],
bible:[{q:'אמהות',a:'שרה, רבקה, רחל, לאה'},{q:'אבות',a:'אברהם, יצחק, יעקב'},{q:'מספר ספרי תנ"ך',a:'24'},{q:'חורבן בית ראשון',a:'586 לפנה"ס, נבוכדנצר'},{q:'חורבן בית שני',a:'70 לספירה, טיטוס'},{q:'מי כתב תהילים',a:'דוד המלך'},{q:'12 שבטים',a:'ראובן, שמעון, לוי, יהודה, יששכר, זבולון, דן, נפתלי, גד, אשר, יוסף, בנימין'},{q:'עקדת יצחק',a:'הר המוריה'},{q:'מלך ישראל ראשון',a:'שאול'},{q:'10 הדיברות',a:'שמות כ׳ ודברים ה׳'}],
literature:[{q:'מטאפורה',a:'השוואה ישירה ללא מילת דמיון'},{q:'דימוי',a:'השוואה עם "כמו"'},{q:'אישוש',a:'תכונות אנושיות לדומם'},{q:'אוקסימורון',a:'צירוף ניגודים'},{q:'אנפורה',a:'חזרה בתחילת שורות'},{q:'הקבלה',a:'שורות במבנה דומה'},{q:'סמל',a:'חפץ המייצג רעיון'},{q:'אירוניה',a:'מובן הפוך לכוונה'},{q:'מצלול',a:'חזרה על צלילים'},{q:'שיר חופשי',a:'ללא חרוז ומשקל'}],
philosophy:[{q:'הרמב"ם',a:'רבי משה בן מימון'},{q:'13 עיקרי האמונה',a:'נכתבו ע"י הרמב"ם'},{q:'מורה נבוכים',a:'ספרו של הרמב"ם'},{q:'ריה"ל',a:'יהודה הלוי, ספר הכוזרי'},{q:'בעל שם טוב',a:'מייסד החסידות'},{q:'אחד העם',a:'אבי הציונות הרוחנית'},{q:'מרטין בובר',a:'פילוסוף הדיאלוג'},{q:'הרמב"ן',a:'משה בן נחמן'},{q:'אריסטו והרמב"ם',a:'השפעה אריסטוטלית'},{q:'פילון',a:'שילב יהדות והלניזם'}],
civics:[{q:'שלוש רשויות',a:'מחוקקת, מבצעת, שופטת'},{q:'חברי כנסת',a:'120'},{q:'אחוז חסימה',a:'3.25%'},{q:'הצהרת העצמאות',a:'14.5.1948'},{q:'חוקי יסוד',a:'כבוד האדם וחירותו, חופש העיסוק'},{q:'תפקיד הנשיא',a:'ייצוגי-סמלי'},{q:'מי בוחר ראש ממשלה',a:'הכנסת'},{q:'חוק השבות',a:'1950'},{q:'בית המשפט העליון',a:'15 שופטים'},{q:'משטר ישראל',a:'דמוקרטיה פרלמנטרית-יהודית'}],
halacha:[{q:'6 מצוות תמידיות',a:'אמונה, ייחוד, אהבה, יראה, איסור ע"ז, איסור הרהור'},{q:'ל"ט מלאכות',a:'אסורות בשבת'},{q:'4 חלקי שו"ע',a:'או"ח, יו"ד, אבן העזר, חו"מ'},{q:'מחבר שולחן ערוך',a:'ר׳ יוסף קארו'},{q:'הגהות הרמ"א',a:'ר׳ משה איסרליש'},{q:'ארבעת המינים',a:'לולב, אתרוג, הדס, ערבה'},{q:'3 סעודות שבת',a:'ליל שבת, בוקר, סעודה שלישית'},{q:'מנין',a:'10 גברים'},{q:'דאורייתא vs דרבנן',a:'תורה / חז"ל'},{q:'7 ברכות',a:'לחתן וכלה'}],
oraltorah:[{q:'6 סדרי משנה',a:'זרעים, מועד, נשים, נזיקין, קודשים, טהרות'},{q:'עורך המשנה',a:'ר׳ יהודה הנשיא'},{q:'תנאים',a:'חכמי המשנה'},{q:'אמוראים',a:'חכמי הגמרא'},{q:'שני תלמודים',a:'בבלי וירושלמי'},{q:'מסכת ברכות',a:'סדר זרעים'},{q:'13 מידות',a:'ר׳ ישמעאל'},{q:'הלל ושמאי',a:'בתי מדרש'},{q:'תוספתא',a:'תוספת למשנה'},{q:'מדרשי הלכה',a:'מכילתא, ספרא, ספרי'}],
prayer:[{q:'3 תפילות',a:'שחרית, מנחה, ערבית'},{q:'מי תיקן',a:'אבותינו'},{q:'שמונה עשרה',a:'תפילת העמידה'},{q:'מודה אני',a:'תפילת הבוקר'},{q:'ק"ש שחרית',a:'עד סוף שעה שלישית'},{q:'מניין',a:'10 גברים'},{q:'כיוון תפילה',a:'אל ירושלים'},{q:'13 מידות רחמים',a:'שמות ל"ד'},{q:'זמן מנחה',a:'מחצות עד שקיעה'},{q:'תפילה היא',a:'עבודה שבלב'}],
family:[{q:'כיבוד הורים',a:'מעשרת הדיברות'},{q:'שלום בית',a:'ערך עליון'},{q:'חינוך בערכים',a:'תפקיד ההורים'},{q:'חנוך לנער',a:'משלי כ"ב, ו׳'},{q:'זמן משפחתי',a:'העברת מסורת'},{q:'גבולות',a:'מפתחים אחריות'},{q:'אוטונומיה',a:'מרחב בחירה'},{q:'תפילה משותפת',a:'מחזקת זהות'},{q:'דיאלוג',a:'שיחה פתוחה'},{q:'אתגרי הדור',a:'מסכים, ערכים מודרניים'}],
};

const getQuestionCategory = (s) => { s = s || ''; if (/מתמטיק/.test(s)) return 'math'; if (/אנגלית|English/i.test(s)) return 'english'; if (/היסטוריה/.test(s)) return 'history'; if (/תנ"?ך|תנך/.test(s)) return 'bible'; if (/ספרות/.test(s)) return 'literature'; if (/מחשבת/.test(s)) return 'philosophy'; if (/אזרחות/.test(s)) return 'civics'; if (/דינים/.test(s)) return 'halacha'; if (/תושבע|תושב"ע/.test(s)) return 'oraltorah'; if (/תפיל/.test(s)) return 'prayer'; if (/חינוך|משפח/.test(s)) return 'family'; return null; };
const getExamDayChecklist = (s) => { const items = ['תעודת זהות','אישור הרשמה','2 עטים שחורים','עיפרון ומחק','בקבוק מים']; s = s || ''; if (/מתמטיק/.test(s)) items.push('מחשבון','סרגל','מחוגה'); if (/אנגלית/.test(s)) items.push('מילון אנגלי-עברי'); if (/תנ"?ך|תנך/.test(s)) items.push('תנ"ך (אם מותר)'); if (/אזרחות|מחשבת/.test(s)) items.push('שעון אנלוגי'); return items; };
const CALM_TIPS = ["נשום עמוק. אתה הגעת לכאן.","כל הידע כבר בתוכך — תן לו לצאת.","מבחן זה לא סוף העולם.","קרא את השאלה לאט.","אם נתקע — דלג. תחזור אחר כך.","אתה לא לבד.","גם 70% זה ציון מצוין."];
const getCalmTip = () => CALM_TIPS[new Date().getDate() % CALM_TIPS.length];
const getQuoteOfDay = () => { const start = new Date(new Date().getFullYear(), 0, 0); const day = Math.floor((new Date() - start) / 86400000); return QUOTES[day % QUOTES.length]; };

const calculateTimeLeft = (target) => { const diff = new Date(target) - new Date(); if (diff <= 0) return {days:0,hours:0,minutes:0,seconds:0,expired:true}; return {days:Math.floor(diff/86400000),hours:Math.floor((diff/3600000)%24),minutes:Math.floor((diff/60000)%60),seconds:Math.floor((diff/1000)%60),expired:false}; };
const formatHebrewDate = (s) => { const d = new Date(s); return `${d.getDate()} ב${HEBREW_MONTHS[d.getMonth()]}`; };
const formatTime = (s) => { const d = new Date(s); return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; };
const uid = () => Math.random().toString(36).slice(2, 11);

const getSubjectEmoji = (s) => { s = s || ''; if (/מתמטיק/.test(s)) return '📐'; if (/אנגלית|English/i.test(s)) return '🇬🇧'; if (/היסטוריה/.test(s)) return '🏛️'; if (/ספרות/.test(s)) return '📖'; if (/תנ"?ך|תנך/.test(s)) return '📜'; if (/מחשבת/.test(s)) return '💭'; if (/אזרחות/.test(s)) return '🗳️'; if (/דינים/.test(s)) return '⚖️'; if (/תפיל/.test(s)) return '🙏'; if (/תושבע|תושב"ע/.test(s)) return '✡️'; if (/חינוך|משפח/.test(s)) return '👨‍👩‍👧'; if (/ביולוגיה/.test(s)) return '🧬'; if (/כימיה/.test(s)) return '🧪'; if (/פיזיק/.test(s)) return '⚛️'; if (/מחשב|תכנות|תוכנ/.test(s)) return '💻'; if (/גיאוגרפיה|גאוגרפיה/.test(s)) return '🌍'; return '🎓'; };

const getSubjectGradient = (s) => { s = s || ''; if (/מתמטיק/.test(s)) return ['#6366F1','#8B5CF6']; if (/אנגלית|English/i.test(s)) return ['#EC4899','#F43F5E']; if (/היסטוריה/.test(s)) return ['#F59E0B','#EF4444']; if (/ספרות/.test(s)) return ['#8B5CF6','#D946EF']; if (/תנ"?ך|תנך/.test(s)) return ['#06B6D4','#3B82F6']; if (/מחשבת/.test(s)) return ['#10B981','#06B6D4']; if (/אזרחות/.test(s)) return ['#F97316','#F59E0B']; if (/דינים/.test(s)) return ['#64748B','#475569']; if (/תפיל/.test(s)) return ['#A855F7','#6366F1']; if (/תושבע/.test(s)) return ['#14B8A6','#06B6D4']; if (/חינוך|משפח/.test(s)) return ['#F43F5E','#EC4899']; return ['#6366F1','#A855F7']; };

const getDayOfWeek = (d) => HEBREW_DAYS[new Date(d).getDay()];
const haptic = (heavy) => { try { if (navigator.vibrate) navigator.vibrate(heavy ? 30 : 10); } catch {} };
const navigateToExam = (exam) => { if (!exam.note) { alert('אין כתובת למבחן זה'); return; } const q = encodeURIComponent(exam.note); window.open(`https://maps.google.com/?q=${q}`, '_blank'); };

let confettiActive = false;
const triggerConfetti = () => { if (confettiActive) return; confettiActive = true; const colors = ['#6366F1','#A855F7','#EC4899','#F59E0B','#10B981','#06B6D4']; const ctn = document.createElement('div'); ctn.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;'; for (let i=0;i<100;i++){ const c=document.createElement('div'); c.style.cssText=`position:absolute;left:${Math.random()*100}%;top:-20px;width:${Math.random()>0.5?10:6}px;height:${Math.random()>0.5?10:14}px;background:${colors[i%colors.length]};animation:confetti ${2+Math.random()*2}s ${Math.random()*0.5}s cubic-bezier(0.1,0.4,0.3,1) forwards;transform:rotate(${Math.random()*360}deg);border-radius:${Math.random()>0.5?'2px':'50%'};`; ctn.appendChild(c); } document.body.appendChild(ctn); setTimeout(()=>{ctn.remove(); confettiActive=false;}, 4500); };

const getExamStatus = (exam, now) => { const start = new Date(exam.datetime); const dur = exam.duration || 120; const end = new Date(start.getTime() + dur * 60000); if (now < start) return 'upcoming'; if (now <= end) return 'inProgress'; return 'past'; };
const calculateTimeUntilEnd = (exam, now) => { const dur = exam.duration || 120; const end = new Date(new Date(exam.datetime).getTime() + dur * 60000); const diff = end - now; if (diff <= 0) return null; return {hours:Math.floor(diff/3600000),minutes:Math.floor((diff/60000)%60),seconds:Math.floor((diff/1000)%60)}; };
const isExamToday = (exam, now) => { const ed = new Date(exam.datetime); return ed.toDateString() === now.toDateString() && ed > now; };
const formatLeaveTime = (datetime, bufferMin = 60) => { const leave = new Date(new Date(datetime).getTime() - bufferMin * 60000); return `${String(leave.getHours()).padStart(2,'0')}:${String(leave.getMinutes()).padStart(2,'0')}`; };

const shareExam = async (exam) => { const text = `🎓 ${exam.subject}\n📅 ${formatHebrewDate(exam.datetime)} בשעה ${formatTime(exam.datetime)}${exam.note ? `\n📍 ${exam.note}` : ''}`; try { if (navigator.share) await navigator.share({title:exam.subject, text}); else { await navigator.clipboard.writeText(text); alert('הועתק'); } } catch (e) {} };
const shareAll = async (exams) => { const sorted = [...exams].sort((a,b) => new Date(a.datetime) - new Date(b.datetime)); const lines = sorted.map((e,i) => `${i+1}. ${e.subject}\n   📅 ${formatHebrewDate(e.datetime)} · ${formatTime(e.datetime)}`); const text = `📚 לוח הבחינות שלי:\n\n${lines.join('\n\n')}`; try { if (navigator.share) await navigator.share({title:'לוח הבחינות', text}); else { await navigator.clipboard.writeText(text); alert('הועתק'); } } catch (e) {} };
const downloadIcs = (exam) => { const start = new Date(exam.datetime); const dur = exam.duration || 120; const end = new Date(start.getTime() + dur * 60000); const fmt = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, ''); const esc = (s) => String(s||'').replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n'); const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Bagrut//IL','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${exam.id || Date.now()}@bagrut.local`,`DTSTAMP:${fmt(new Date())}`,`DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,`SUMMARY:${esc(exam.subject)}`,exam.note ? `LOCATION:${esc(exam.note)}` : '','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:מבחן מחר!','TRIGGER:-P1D','END:VALARM','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:מבחן בעוד שעה','TRIGGER:-PT1H','END:VALARM','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:15 דקות למבחן','TRIGGER:-PT15M','END:VALARM','END:VEVENT','END:VCALENDAR'].filter(Boolean).join('\r\n'); const blob = new Blob([ics], {type:'text/calendar'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${exam.subject.replace(/[^֐-׿a-zA-Z0-9]+/g,'_')}.ics`; document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(() => URL.revokeObjectURL(url), 100); };

let notifTimers = [];
const requestNotifPermission = async () => { if (!('Notification' in window)) return 'unsupported'; if (Notification.permission === 'granted') return 'granted'; if (Notification.permission === 'denied') return 'denied'; try { return await Notification.requestPermission(); } catch { return 'denied'; } };
const showNotif = (title, body, tag) => { try { if (Notification.permission === 'granted') new Notification(title, {body, tag}); } catch {} };
const scheduleExamNotifications = (exams) => { notifTimers.forEach(clearTimeout); notifTimers = []; if (!('Notification' in window) || Notification.permission !== 'granted') return; const now = Date.now(); exams.forEach(exam => { const examTime = new Date(exam.datetime).getTime(); const emoji = getSubjectEmoji(exam.subject); const reminders = [{at:examTime-86400000,title:`${emoji} מחר יש לך מבחן!`,body:`${exam.subject} בשעה ${formatTime(exam.datetime)}`},{at:examTime-3600000,title:'⏰ מבחן בעוד שעה',body:`${exam.subject}`},{at:examTime-900000,title:'🏃 15 דקות למבחן!',body:`${exam.subject}`}]; reminders.forEach((r,i) => { const d = r.at - now; if (d > 0 && d < 2147483647) notifTimers.push(setTimeout(() => showNotif(r.title, r.body, `${exam.id}-${i}`), d)); }); }); };

const store = { get:(k,def)=>{ try { const v=localStorage.getItem(k); return v?JSON.parse(v):def; } catch { return def; } }, set:(k,v)=>{ try { localStorage.setItem(k,JSON.stringify(v)); } catch {} } };

const getTheme = (d) => d ? {
  bg:'#0A0A14', bgGradient:'radial-gradient(ellipse at top, #1A1A2E 0%, #0A0A14 50%)',
  card:'rgba(26,26,46,0.6)', cardSolid:'#141424', cardElevated:'rgba(30,30,50,0.95)',
  text:'#F4F4F8', textMuted:'#9CA3AF', textSubtle:'#6B7280',
  border:'rgba(255,255,255,0.08)', borderStrong:'rgba(255,255,255,0.15)',
  accent:'#818CF8', accentSoft:'rgba(129,140,248,0.15)', accentText:'#0A0A14',
  tabBg:'rgba(255,255,255,0.05)',
  surface1:'rgba(255,255,255,0.03)', surface2:'rgba(255,255,255,0.06)'
} : {
  bg:'#FAFAFB', bgGradient:'radial-gradient(ellipse at top, #F3F4FF 0%, #FAFAFB 50%)',
  card:'rgba(255,255,255,0.7)', cardSolid:'#FFFFFF', cardElevated:'rgba(255,255,255,0.98)',
  text:'#0F0F1A', textMuted:'#6B7280', textSubtle:'#9CA3AF',
  border:'rgba(0,0,0,0.06)', borderStrong:'rgba(0,0,0,0.12)',
  accent:'#6366F1', accentSoft:'rgba(99,102,241,0.1)', accentText:'#FFFFFF',
  tabBg:'rgba(0,0,0,0.04)',
  surface1:'rgba(0,0,0,0.02)', surface2:'rgba(0,0,0,0.04)'
};

const parseBagrutText = (rawText) => {
const text = rawText.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');
const pattern = /(\d{1,2})[.:](\d{2})\s+(\d{2})\/(\d{2})\/(\d{4})\s+(.+?)\s+(\d{4,5})(?=\s|$)/g;
const subjectKW = /(?:מתמטיק|אנגלית|היסטוריה|תנ"?ך|ספרות|מחשבת|אזרחות|דינים|תפיל|תושבע|חינוך|משפח|ביולוגיה|כימיה|פיזיק|לשון|עברית|גיאוגרפיה)/;
const locMarkers = /(שלוחת|מכללת|מרכז\s|_?ברנר|אפעל|בית\s*ספר|אולפנת|ישיבת)/;
const extractFromChunk = (chunk) => {
const kwMatch = chunk.match(subjectKW);
if (kwMatch) {
const start = kwMatch.index;
const rest = chunk.substring(start);
const locMatch = rest.match(locMarkers);
let subj, n;
if (locMatch) { subj = rest.substring(0, locMatch.index).trim(); n = (chunk.substring(0, start).trim() + ' ' + rest.substring(locMatch.index)).trim(); }
else { const words = rest.split(/\s+/); const wc = Math.min(4, words.length); subj = words.slice(0, wc).join(' ').trim(); n = (chunk.substring(0, start).trim() + ' ' + words.slice(wc).join(' ')).trim(); }
return {subject: subj, note: n, score: 10};
}
const locIdx = chunk.search(locMarkers);
if (locIdx > 0) return {subject: chunk.substring(0, locIdx).trim(), note: chunk.substring(locIdx).trim(), score: 5};
const parts = chunk.split(' ');
return {subject: parts.slice(0, 3).join(' '), note: parts.slice(3).join(' '), score: 1};
};
const exams = [];
let m;
while ((m = pattern.exec(text)) !== null) {
const hh = m[1], min = m[2], dd = m[3], mm = m[4], yyyy = m[5];
const origChunk = m[6].trim();
const shaalon = m[7];
const dN = parseInt(dd), mN = parseInt(mm), hN = parseInt(hh), minN = parseInt(min);
if (dN < 1 || dN > 31 || mN < 1 || mN > 12 || hN > 23 || minN > 59) continue;
let revChunk = origChunk.split('').reverse().join('');
revChunk = revChunk.replace(/\d{2,}/g, n => n.split('').reverse().join(''));
const fwd = extractFromChunk(origChunk);
const rev = extractFromChunk(revChunk);
const chosen = rev.score > fwd.score ? rev : fwd;
let subject = chosen.subject.replace(/\s*-\s*תכנית\s*חדשה\s*/, ' ').trim();
if (!subject) subject = 'מקצוע';
const dtStr = `${yyyy}-${mm}-${dd}T${hh.padStart(2,'0')}:${min}:00`;
exams.push({ subject: `${subject} ${shaalon}`, datetime: new Date(dtStr).toISOString(), note: chosen.note });
}
const seen = new Set();
return exams.filter(e => { const k = `${e.datetime}|${e.subject}`; if (seen.has(k)) return false; seen.add(k); return true; });
};

let pdfJsPromise = null;
const loadPdfJs = () => { if (pdfJsPromise) return pdfJsPromise; pdfJsPromise = new Promise((resolve, reject) => { if (window.pdfjsLib) return resolve(window.pdfjsLib); const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.min.js'; s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js'; resolve(window.pdfjsLib); }; s.onerror = () => reject(new Error('שגיאה בטעינת ספריית PDF')); document.head.appendChild(s); }); return pdfJsPromise; };

function App() {
const [exams, setExams] = useState(() => store.get('bagrut-exams', []));
const [completed, setCompleted] = useState(() => store.get('bagrut-completed', []));
const [darkMode, setDarkMode] = useState(() => store.get('bagrut-dark', false));
const [activeTab, setActiveTab] = useState('active');
const [showForm, setShowForm] = useState(false);
const [showImport, setShowImport] = useState(false);
const [editingExam, setEditingExam] = useState(null);
const [practiceExam, setPracticeExam] = useState(null);
const [showBreathing, setShowBreathing] = useState(false);
const [notifStatus, setNotifStatus] = useState(() => 'Notification' in window ? Notification.permission : 'unsupported');
const [now, setNow] = useState(new Date());

useEffect(() => store.set('bagrut-exams', exams), [exams]);
useEffect(() => store.set('bagrut-completed', completed), [completed]);
useEffect(() => store.set('bagrut-dark', darkMode), [darkMode]);
useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
useEffect(() => { scheduleExamNotifications(exams); }, [exams, notifStatus]);

const sortedExams = useMemo(() => [...exams].sort((a,b) => new Date(a.datetime) - new Date(b.datetime)), [exams]);
const upcomingExams = useMemo(() => sortedExams.filter(e => new Date(e.datetime) > now), [sortedExams, now]);
const closestExam = upcomingExams[0];
const lastUpcoming = upcomingExams[upcomingExams.length - 1];
const totalTimeLeft = lastUpcoming ? calculateTimeLeft(lastUpcoming.datetime) : null;
const t = getTheme(darkMode);

const handleSave = (data) => { if (editingExam) setExams(exams.map(e => e.id === editingExam.id ? {...data, id: editingExam.id} : e)); else setExams([...exams, {...data, id: uid()}]); setShowForm(false); setEditingExam(null); };
const handleEdit = (exam) => { setEditingExam(exam); setShowForm(true); };
const handleDelete = (id) => setExams(exams.filter(e => e.id !== id));
const handleComplete = (exam) => { setExams(exams.filter(e => e.id !== exam.id)); setCompleted([{...exam, completedAt: new Date().toISOString()}, ...completed]); triggerConfetti(); };
const handleRestore = (exam) => { setCompleted(completed.filter(e => e.id !== exam.id)); const { completedAt, ...rest } = exam; setExams([...exams, rest]); };
const handleDeleteCompleted = (id) => setCompleted(completed.filter(e => e.id !== id));
const handleBulkImport = (newExams) => { setExams([...exams, ...newExams.map(e => ({...e, id: uid()}))]); setShowImport(false); };
const handleEnableNotifs = async () => { haptic(); const r = await requestNotifPermission(); setNotifStatus(r); if (r === 'granted') { showNotif('🎉 התראות הופעלו!', 'תקבל תזכורות לפני כל מבחן'); scheduleExamNotifications(exams); } else if (r === 'denied') alert('ההתראות נחסמו. אפשר להפעיל בהגדרות ספארי.'); };

useEffect(() => { document.body.style.background = t.bgGradient; document.body.style.color = t.text; }, [darkMode]);

return (<div dir="rtl" style={{ minHeight:'100vh', background:t.bgGradient, color:t.text, paddingTop:'env(safe-area-inset-top)', paddingBottom:'env(safe-area-inset-bottom)', transition:'all 0.3s ease', position:'relative' }}>

<div style={{ maxWidth:500, margin:'0 auto', padding:'16px 16px 100px', position:'relative' }}>

{/* HEADER */}
<header className="fade-in" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
  <div style={{display:'flex', gap:8, alignItems:'center'}}>
    <button className="press icon-btn" onClick={handleEnableNotifs} style={{ width:40, height:40, color:notifStatus==='granted'?t.accent:t.textMuted, background:notifStatus==='granted'?t.accentSoft:t.surface1 }}><Icon name={notifStatus==='granted'?'Bell':'BellOff'} size={18}/></button>
    <button className="press icon-btn" onClick={() => { haptic(); setDarkMode(!darkMode); }} style={{ width:40, height:40, color:t.textMuted, background:t.surface1 }}><Icon name={darkMode?'Sun':'Moon'} size={18}/></button>
  </div>
  <div style={{textAlign:'right'}}>
    <div style={{fontSize:11, fontWeight:600, color:t.textSubtle, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:2}}>BAGRUT</div>
    <div style={{fontSize:22, fontWeight:800, letterSpacing:'-0.03em', lineHeight:1, color:t.text}}>ספירה לאחור</div>
  </div>
</header>

{/* COUNTDOWN HERO */}
{closestExam && totalTimeLeft && !totalTimeLeft.expired && (
  <div className="fade-up scale-in" style={{
    position:'relative', borderRadius:28, padding:'28px 24px 24px',
    background: `linear-gradient(135deg, ${getSubjectGradient(closestExam.subject)[0]}, ${getSubjectGradient(closestExam.subject)[1]})`,
    color:'#fff', marginBottom:20, overflow:'hidden',
    boxShadow: darkMode ? '0 20px 60px rgba(99,102,241,0.4)' : '0 20px 60px rgba(99,102,241,0.3)',
  }}>
    <div style={{position:'absolute', top:-40, insetInlineEnd:-30, fontSize:180, opacity:0.15, lineHeight:1, filter:'blur(1px)'}}>{getSubjectEmoji(closestExam.subject)}</div>
    <div style={{position:'relative', zIndex:1}}>
      <div style={{display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', opacity:0.9, marginBottom:12}}>
        <Icon name="Flame" size={13}/>המבחן הבא
      </div>
      <div style={{fontSize:24, fontWeight:800, letterSpacing:'-0.02em', marginBottom:4, lineHeight:1.1}}>{closestExam.subject}</div>
      <div style={{fontSize:13, opacity:0.85, marginBottom:20}}>יום {getDayOfWeek(closestExam.datetime)} · {formatHebrewDate(closestExam.datetime)} · {formatTime(closestExam.datetime)}</div>
      <HeroCountdown exam={closestExam} now={now}/>
    </div>
  </div>
)}

{/* STATS BAR */}
{(exams.length > 0 || completed.length > 0) && (
  <div className="fade-up" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:20, animationDelay:'0.08s'}}>
    <StatCard t={t} darkMode={darkMode} icon="Trophy" value={completed.length} label="הסתיימו" color="#10B981"/>
    <StatCard t={t} darkMode={darkMode} icon="Zap" value={upcomingExams.length} label="לפניך" color={t.accent}/>
    <StatCard t={t} darkMode={darkMode} icon="TrendingUp" value={`${completed.length + exams.length > 0 ? Math.round(completed.length / (completed.length + exams.length) * 100) : 0}%`} label="התקדמות" color="#F59E0B"/>
  </div>
)}

{/* QUOTE */}
<div className="fade-up" style={{ padding:'14px 18px', marginBottom:20, background:t.card, borderRadius:18, border:`1px solid ${t.border}`, display:'flex', gap:12, alignItems:'center', animationDelay:'0.12s', backdropFilter:'blur(20px)' }}>
  <div style={{fontSize:20, filter:'grayscale(0.1)'}}>💭</div>
  <div style={{flex:1, fontSize:14, color:t.text, lineHeight:1.4, fontWeight:500, fontStyle:'italic'}}>"{getQuoteOfDay()}"</div>
</div>

{/* ACTIONS */}
<div className="fade-up" style={{display:'flex', gap:8, marginBottom:20, animationDelay:'0.15s'}}>
  <button className="press" onClick={() => { haptic(); setEditingExam(null); setShowForm(true); }} style={{ flex:1, padding:'14px 16px', background:`linear-gradient(135deg, ${t.accent}, #A855F7)`, color:'#fff', borderRadius:14, fontSize:14, fontWeight:700, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, boxShadow:'0 8px 24px rgba(99,102,241,0.3)' }}><Icon name="Plus" size={16} strokeWidth={2.6}/>הוסף מבחן</button>
  <button className="press" onClick={() => { haptic(); setShowImport(true); }} style={{ padding:'14px 16px', background:t.card, border:`1px solid ${t.borderStrong}`, color:t.text, borderRadius:14, fontSize:14, fontWeight:600, display:'inline-flex', alignItems:'center', gap:6, backdropFilter:'blur(20px)' }}><Icon name="Upload" size={15}/>ייבוא</button>
</div>

{/* TABS */}
<div className="fade-up" style={{display:'flex', gap:4, padding:4, background:t.tabBg, borderRadius:14, marginBottom:16, animationDelay:'0.18s', backdropFilter:'blur(10px)'}}>
  {[{id:'archive',label:'ארכיון',count:completed.length,icon:'Archive'},{id:'calendar',label:'לוח',count:null,icon:'CalendarDays'},{id:'active',label:'פעילים',count:exams.length,icon:'Flame'}].map(tab => {
    const isActive = activeTab === tab.id;
    return (<button key={tab.id} onClick={() => { haptic(); setActiveTab(tab.id); }} className="press" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:5, padding:'10px 6px', borderRadius:11, background:isActive?(darkMode?'rgba(255,255,255,0.08)':t.cardSolid):'transparent', color:isActive?t.text:t.textMuted, fontSize:13, fontWeight:isActive?700:500, boxShadow:isActive?(darkMode?'0 2px 8px rgba(0,0,0,0.3)':'0 2px 8px rgba(0,0,0,0.06)'):'none', transition:'all 0.2s' }}>
      <Icon name={tab.icon} size={14} strokeWidth={isActive?2.5:2}/>
      <span>{tab.label}{tab.count !== null && ` ${tab.count}`}</span>
    </button>);
  })}
</div>

{activeTab === 'active' && (<ActiveTab t={t} darkMode={darkMode} sortedExams={sortedExams} upcomingExams={upcomingExams} closestExam={closestExam} now={now} onEdit={handleEdit} onDelete={handleDelete} onComplete={handleComplete} onPractice={e => setPracticeExam(e)} onBreathing={() => setShowBreathing(true)} onAdd={() => { setEditingExam(null); setShowForm(true); }} onShareAll={() => shareAll([...exams, ...completed])}/>)}
{activeTab === 'calendar' && (<CalendarView t={t} darkMode={darkMode} exams={[...upcomingExams, ...sortedExams.filter(e => new Date(e.datetime) <= now), ...completed.map(c => ({...c, completed:true}))]}/>)}
{activeTab === 'archive' && (<ArchiveTab t={t} darkMode={darkMode} completed={completed} onRestore={handleRestore} onDelete={handleDeleteCompleted}/>)}

</div>

{showForm && <ExamForm exam={editingExam} t={t} darkMode={darkMode} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingExam(null); }}/>}
{showImport && <ImportModal t={t} darkMode={darkMode} onImport={handleBulkImport} onCancel={() => setShowImport(false)}/>}
{practiceExam && <PracticeModal exam={practiceExam} t={t} darkMode={darkMode} onClose={() => setPracticeExam(null)}/>}
{showBreathing && <BreathingModal t={t} darkMode={darkMode} onClose={() => setShowBreathing(false)}/>}

</div>);
}

function HeroCountdown({ exam, now }) {
  const tl = calculateTimeLeft(exam.datetime);
  return (<div className="num" style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8}}>
    {[{v:tl.days,l:'ימים'},{v:tl.hours,l:'שעות'},{v:tl.minutes,l:'דקות'},{v:tl.seconds,l:'שניות'}].map((u,i) => (
      <div key={i} style={{background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', borderRadius:14, padding:'12px 4px', textAlign:'center'}}>
        <div style={{fontSize:28, fontWeight:800, lineHeight:1, letterSpacing:'-0.03em', color:'#fff'}}>{String(u.v).padStart(2,'0')}</div>
        <div style={{fontSize:10, opacity:0.8, marginTop:4, fontWeight:600, letterSpacing:'0.05em'}}>{u.l}</div>
      </div>
    ))}
  </div>);
}

function StatCard({ t, darkMode, icon, value, label, color }) {
  return (<div style={{background:t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:'12px', textAlign:'center', backdropFilter:'blur(20px)'}}>
    <div style={{width:28, height:28, borderRadius:9, background:`${color}20`, color, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 6px'}}><Icon name={icon} size={14} strokeWidth={2.4}/></div>
    <div className="num" style={{fontSize:20, fontWeight:800, color:t.text, lineHeight:1, letterSpacing:'-0.02em'}}>{value}</div>
    <div style={{fontSize:10, color:t.textMuted, marginTop:3, fontWeight:600}}>{label}</div>
  </div>);
}

function ActiveTab({ t, darkMode, sortedExams, upcomingExams, closestExam, now, onEdit, onDelete, onComplete, onPractice, onBreathing, onAdd, onShareAll }) {
const todayExam = upcomingExams.find(e => isExamToday(e, now));
return (<>
{todayExam && <ExamDayCard exam={todayExam} t={t} darkMode={darkMode} now={now} onOpenBreathing={onBreathing} onNavigate={() => navigateToExam(todayExam)}/>}

{sortedExams.length === 0 && (<div className="fade-up scale-in" style={{textAlign:'center', padding:'60px 24px', background:t.card, borderRadius:24, border:`1px dashed ${t.borderStrong}`, backdropFilter:'blur(20px)'}}>
  <div style={{fontSize:48, marginBottom:12}}>🎓</div>
  <h2 style={{fontSize:22, margin:'0 0 6px', fontWeight:800, color:t.text, letterSpacing:'-0.02em'}}>בוא נתחיל</h2>
  <p style={{fontSize:14, color:t.textMuted, margin:'0 0 24px', lineHeight:1.5}}>הוסף את המבחן הראשון<br/>או ייבא מ-PDF של משרד החינוך</p>
  <button className="press" onClick={onAdd} style={{ padding:'14px 28px', background:`linear-gradient(135deg, ${t.accent}, #A855F7)`, color:'#fff', borderRadius:14, fontSize:15, fontWeight:700, display:'inline-flex', alignItems:'center', gap:8, boxShadow:'0 8px 24px rgba(99,102,241,0.3)' }}><Icon name="Plus" size={16} strokeWidth={2.6}/>הוסף מבחן ראשון</button>
</div>)}

{sortedExams.length > 0 && (<div style={{display:'flex', flexDirection:'column', gap:10}}>
  {sortedExams.map((exam, idx) => { const tl = calculateTimeLeft(exam.datetime); const isPast = new Date(exam.datetime) < now; const isClosest = !isPast && exam.id === closestExam?.id; return (<ExamCard key={exam.id} exam={exam} timeLeft={tl} isPast={isPast} isClosest={isClosest} t={t} darkMode={darkMode} now={now} onEdit={onEdit} onDelete={onDelete} onComplete={onComplete} onPractice={onPractice} delay={0.05 * idx}/>); })}
</div>)}
</>);
}

function ExamCard({ exam, timeLeft, isPast, isClosest, t, darkMode, onEdit, onDelete, onComplete, onPractice, delay, now }) {
const [expanded, setExpanded] = useState(false);
const status = getExamStatus(exam, now);
const inProgress = status === 'inProgress';
const timeUntilEnd = inProgress ? calculateTimeUntilEnd(exam, now) : null;
const [c1, c2] = getSubjectGradient(exam.subject);
const emoji = getSubjectEmoji(exam.subject);
const urgent = timeLeft.days < 7 && !isPast;

return (<div className="fade-up" style={{
  background:t.card, borderRadius:20, padding:'0',
  border:`1px solid ${inProgress ? c1 : urgent ? '#F59E0B40' : t.border}`,
  animationDelay:`${delay}s`, position:'relative', opacity:isPast?0.6:1,
  backdropFilter:'blur(20px)', overflow:'hidden',
  boxShadow: isClosest && !inProgress ? `0 0 0 2px ${c1}30` : 'none',
}}>

{/* Accent strip */}
<div style={{position:'absolute', insetInlineEnd:0, top:0, bottom:0, width:4, background:`linear-gradient(180deg, ${c1}, ${c2})`}}/>

{inProgress && (<div className="pulse" style={{ position:'absolute', top:12, insetInlineStart:12, background:'#EF4444', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:999, display:'inline-flex', alignItems:'center', gap:4, letterSpacing:'0.05em' }}><span style={{width:5,height:5,borderRadius:'50%',background:'#fff'}}/>בעיצומו</div>)}

<div onClick={() => { haptic(); setExpanded(!expanded); }} style={{padding:'14px 18px', cursor:'pointer'}}>
  <div style={{display:'flex', alignItems:'flex-start', gap:12}}>
    <div style={{width:40, height:40, borderRadius:12, background:`linear-gradient(135deg, ${c1}20, ${c2}20)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0}}>{emoji}</div>
    <div style={{flex:1, minWidth:0}}>
      <div style={{fontSize:15, fontWeight:700, color:t.text, letterSpacing:'-0.01em', marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{exam.subject}</div>
      <div style={{fontSize:11.5, color:t.textMuted, display:'flex', alignItems:'center', gap:8, flexWrap:'wrap'}}>
        <span style={{display:'inline-flex', alignItems:'center', gap:4, fontWeight:600, color:inProgress?'#EF4444':urgent?'#F59E0B':t.textMuted}}>יום {getDayOfWeek(exam.datetime)}</span>
        <span style={{color:t.textSubtle}}>·</span>
        <span>{formatHebrewDate(exam.datetime)}</span>
        <span style={{color:t.textSubtle}}>·</span>
        <span className="num">{formatTime(exam.datetime)}</span>
      </div>
    </div>
    <div style={{textAlign:'left', flexShrink:0}}>
      {inProgress && timeUntilEnd ? (<div className="num" style={{fontSize:13, fontWeight:700, color:'#EF4444', letterSpacing:'-0.01em'}}>⏱ {String(timeUntilEnd.hours).padStart(2,'0')}:{String(timeUntilEnd.minutes).padStart(2,'0')}:{String(timeUntilEnd.seconds).padStart(2,'0')}</div>) : isPast ? (<div style={{fontSize:11, fontWeight:600, color:t.textMuted}}>עבר</div>) : (<>
        <div className="num" style={{fontSize:22, fontWeight:800, color:urgent?'#F59E0B':t.text, lineHeight:1, letterSpacing:'-0.03em'}}>{timeLeft.days}</div>
        <div style={{fontSize:10, color:t.textMuted, marginTop:2, fontWeight:600}}>ימים</div>
      </>)}
    </div>
  </div>
</div>

{expanded && (<div className="fade-in" style={{padding:'0 18px 14px', borderTop:`1px solid ${t.border}`}}>
  <div style={{display:'flex', gap:6, flexWrap:'wrap', marginTop:12}}>
    <ActionChip t={t} icon="BookOpen" label="תרגול" onClick={() => { haptic(); onPractice && onPractice(exam); }}/>
    <ActionChip t={t} icon="MapPin" label="ניווט" disabled={!exam.note} onClick={() => { haptic(); navigateToExam(exam); }}/>
    <ActionChip t={t} icon="CalendarPlus" label="ליומן" onClick={() => { haptic(); downloadIcs(exam); }}/>
    <ActionChip t={t} icon="Share2" label="שתף" onClick={() => { haptic(); shareExam(exam); }}/>
    <ActionChip t={t} icon="Edit2" label="ערוך" onClick={() => { haptic(); onEdit(exam); }}/>
    <ActionChip t={t} icon="CheckCircle2" label="סיים" color="#10B981" onClick={() => { haptic(true); onComplete(exam); }}/>
    <ActionChip t={t} icon="Trash2" label="מחק" color="#EF4444" onClick={() => { haptic(); if(confirm('למחוק?')) onDelete(exam.id); }}/>
  </div>
  {exam.note && (<div style={{marginTop:10, fontSize:12, color:t.textMuted, lineHeight:1.5, padding:'10px 12px', background:t.surface1, borderRadius:10}}>📍 {exam.note}</div>)}
</div>)}

</div>);
}

function ActionChip({ t, icon, label, onClick, color, disabled }) {
  return (<button className="press" onClick={onClick} disabled={disabled} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'8px 12px', background:color?`${color}15`:t.surface1, color:disabled?t.textSubtle:(color||t.text), border:`1px solid ${color?color+'30':t.border}`, borderRadius:10, fontSize:12, fontWeight:600, fontFamily:'inherit', opacity:disabled?0.5:1 }}><Icon name={icon} size={12}/>{label}</button>);
}

function ExamDayCard({ exam, t, darkMode, now, onOpenBreathing, onNavigate }) {
const [checked, setChecked] = useState(() => store.get(`bagrut-checklist-${exam.id}`, {}));
const items = useMemo(() => getExamDayChecklist(exam.subject), [exam.subject]);
const tl = calculateTimeLeft(exam.datetime);
useEffect(() => { store.set(`bagrut-checklist-${exam.id}`, checked); }, [checked, exam.id]);
const toggle = (item) => { haptic(); setChecked({...checked, [item]: !checked[item]}); };
const doneCount = items.filter(i => checked[i]).length;
const [c1, c2] = getSubjectGradient(exam.subject);

return (<div className="fade-up scale-in" style={{
  background: `linear-gradient(135deg, ${c1}, ${c2})`,
  borderRadius:24, padding:'20px', marginBottom:20,
  color:'#fff', boxShadow:`0 20px 50px ${c1}50`, position:'relative', overflow:'hidden',
}}>
  <div style={{position:'absolute', top:-30, insetInlineEnd:-20, fontSize:140, opacity:0.15, lineHeight:1}}>{getSubjectEmoji(exam.subject)}</div>
  <div style={{position:'relative'}}>
    <div style={{display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', background:'rgba(255,255,255,0.25)', borderRadius:999, fontSize:10, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12}}>
      <Icon name="Target" size={11}/>היום!
    </div>
    <div style={{fontSize:22, fontWeight:800, letterSpacing:'-0.02em', marginBottom:4, lineHeight:1.15}}>{exam.subject}</div>
    <div className="num" style={{fontSize:13, opacity:0.9, marginBottom:16}}>בעוד {tl.hours > 0 ? `${tl.hours} שעות ו-${tl.minutes} ד׳` : `${tl.minutes} דקות`} · {formatTime(exam.datetime)}</div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginBottom:14}}>
      <QuickAction icon="Clock" label="יציאה" value={formatLeaveTime(exam.datetime)}/>
      <QuickAction icon="MapPin" label="ניווט" value="מפה" onClick={onNavigate}/>
      <QuickAction icon="Wind" label="נשימה" value="1 דק" onClick={onOpenBreathing}/>
    </div>

    <div style={{background:'rgba(255,255,255,0.15)', borderRadius:14, padding:14, marginBottom:12, backdropFilter:'blur(10px)'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, fontSize:12, fontWeight:700}}>
        <span>📋 רשימת ציוד</span>
        <span className="num" style={{opacity:0.85}}>{doneCount}/{items.length}</span>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:4}}>
        {items.map(item => (<button key={item} onClick={() => toggle(item)} className="press" style={{display:'flex', alignItems:'center', gap:8, padding:'5px 2px', background:'transparent', color:'#fff', fontFamily:'inherit', textAlign:'right', fontSize:13, opacity:checked[item]?0.5:1, textDecoration:checked[item]?'line-through':'none'}}>
          <div style={{width:16, height:16, borderRadius:4, flexShrink:0, background:checked[item]?'#fff':'transparent', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center'}}>{checked[item] && <Icon name="Check" size={10} color={c1} strokeWidth={4}/>}</div>
          <span>{item}</span>
        </button>))}
      </div>
    </div>

    <div style={{fontSize:12, fontStyle:'italic', opacity:0.95, lineHeight:1.5, textAlign:'center', padding:'4px'}}>💙 {getCalmTip()}</div>
  </div>
</div>);
}

function QuickAction({ icon, label, value, onClick }) {
  return (<button onClick={onClick} className="press" style={{background:'rgba(255,255,255,0.2)', border:'none', borderRadius:12, padding:'10px 6px', color:'#fff', textAlign:'center', fontFamily:'inherit', backdropFilter:'blur(10px)', cursor:onClick?'pointer':'default'}}>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:4, fontSize:10, opacity:0.85, fontWeight:600, marginBottom:3}}><Icon name={icon} size={10}/>{label}</div>
    <div className="num" style={{fontSize:14, fontWeight:800}}>{value}</div>
  </button>);
}

function ArchiveTab({ t, darkMode, completed, onRestore, onDelete }) {
if (completed.length === 0) return (<div className="fade-up scale-in" style={{textAlign:'center', padding:'60px 24px', background:t.card, borderRadius:24, border:`1px dashed ${t.borderStrong}`, backdropFilter:'blur(20px)'}}>
  <div style={{fontSize:48, marginBottom:12}}>🏆</div>
  <h2 style={{fontSize:20, margin:'0 0 6px', fontWeight:800, color:t.text}}>הארכיון ריק</h2>
  <p style={{fontSize:14, color:t.textMuted, margin:0}}>מבחנים שתסיים יופיעו כאן</p>
</div>);
return (<div className="fade-up" style={{display:'flex', flexDirection:'column', gap:8}}>{completed.map(exam => {
  const emoji = getSubjectEmoji(exam.subject);
  return (<div key={exam.id} style={{background:t.card, borderRadius:14, padding:'12px 14px', border:`1px solid ${t.border}`, display:'flex', alignItems:'center', gap:12, backdropFilter:'blur(20px)'}}>
    <div style={{width:32, height:32, borderRadius:10, background:'#10B98120', color:'#10B981', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}><Icon name="Check" size={14} strokeWidth={3}/></div>
    <div style={{flex:1, minWidth:0}}>
      <div style={{fontWeight:600, fontSize:14, color:t.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{emoji} {exam.subject}</div>
      <div style={{fontSize:11, color:t.textSubtle, marginTop:2}}>{formatHebrewDate(exam.datetime)}</div>
    </div>
    <button onClick={() => onRestore(exam)} className="icon-btn press" style={{width:32,height:32,color:t.textMuted,background:t.surface1}} aria-label="שחזר"><Icon name="RotateCw" size={13}/></button>
    <button onClick={() => onDelete(exam.id)} className="icon-btn press" style={{width:32,height:32,color:t.textMuted,background:t.surface1}} aria-label="מחק"><Icon name="Trash2" size={13}/></button>
  </div>);
})}</div>);
}

function CalendarView({ t, darkMode, exams }) {
const today = new Date();
const [viewDate, setViewDate] = useState(() => { const u = exams.filter(e => !e.completed && new Date(e.datetime) > new Date()); if (u.length > 0) return new Date(u.sort((a,b) => new Date(a.datetime) - new Date(b.datetime))[0].datetime); return new Date(); });
const [selectedDay, setSelectedDay] = useState(null);
const year = viewDate.getFullYear();
const month = viewDate.getMonth();
const firstDay = new Date(year, month, 1);
const daysInMonth = new Date(year, month+1, 0).getDate();
const startDayOfWeek = firstDay.getDay();
const monthExams = exams.filter(e => { const d = new Date(e.datetime); return d.getFullYear() === year && d.getMonth() === month; });
const examsByDay = {};
monthExams.forEach(e => { const d = new Date(e.datetime).getDate(); (examsByDay[d] = examsByDay[d] || []).push(e); });
const isToday = (day) => year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
const dayLabels = ['א','ב','ג','ד','ה','ו','ש'];
const cells = [];
for (let i = 0; i < startDayOfWeek; i++) cells.push(null);
for (let d = 1; d <= daysInMonth; d++) cells.push(d);
const selectedDayExams = selectedDay !== null ? (examsByDay[selectedDay] || []) : [];

return (<div className="fade-up">
  <div style={{background:t.card, borderRadius:20, padding:18, border:`1px solid ${t.border}`, backdropFilter:'blur(20px)', marginBottom:14}}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
      <button onClick={() => { haptic(); setSelectedDay(null); setViewDate(new Date(year, month-1, 1)); }} className="icon-btn press" style={{width:34,height:34,color:t.textMuted,background:t.surface1}}><Icon name="ChevronRight" size={16}/></button>
      <div style={{textAlign:'center', flex:1}}>
        <div style={{fontSize:17, fontWeight:800, letterSpacing:'-0.02em', color:t.text}}>{HEBREW_MONTHS[month]} {year}</div>
        {(year !== today.getFullYear() || month !== today.getMonth()) && (<button onClick={() => { setSelectedDay(null); setViewDate(new Date()); }} style={{marginTop:2, background:'transparent', border:'none', fontSize:11, color:t.accent, fontWeight:600}}>חזרה להיום</button>)}
      </div>
      <button onClick={() => { haptic(); setSelectedDay(null); setViewDate(new Date(year, month+1, 1)); }} className="icon-btn press" style={{width:34,height:34,color:t.textMuted,background:t.surface1}}><Icon name="ChevronLeft" size={16}/></button>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3, marginBottom:4}}>{dayLabels.map((l,i) => (<div key={i} style={{textAlign:'center', fontSize:10, fontWeight:700, color:t.textSubtle, padding:'4px 0'}}>{l}</div>))}</div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3}}>{cells.map((day, idx) => {
      if (day === null) return <div key={`e${idx}`} style={{aspectRatio:'1'}}/>;
      const dayExams = examsByDay[day] || [];
      const hasExam = dayExams.length > 0;
      const allCompleted = hasExam && dayExams.every(e => e.completed);
      const upcoming = dayExams.filter(e => !e.completed);
      const closestUp = upcoming.sort((a,b) => new Date(a.datetime) - new Date(b.datetime))[0];
      const dColor = closestUp ? getSubjectGradient(closestUp.subject)[0] : null;
      const todayCell = isToday(day);
      const selected = selectedDay === day;
      return (<button key={day} onClick={() => { haptic(); setSelectedDay(selected?null:day); }} className="press" style={{aspectRatio:'1', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2, border:'none', borderRadius:10, background:selected?t.accent:(hasExam && !allCompleted)?`${dColor}25`:todayCell?t.surface2:'transparent', outline:todayCell && !selected?`1.5px solid ${t.accent}`:'none', outlineOffset:-1, fontFamily:'inherit'}}>
        <div className="num" style={{fontSize:13, fontWeight:todayCell || hasExam?700:500, color:selected?t.accentText:(hasExam && !allCompleted)?dColor:allCompleted?t.textSubtle:t.text, textDecoration:allCompleted && !selected?'line-through':'none', lineHeight:1}}>{day}</div>
        {hasExam && (<div style={{display:'flex', gap:2}}>{dayExams.slice(0,3).map((_,i) => (<div key={i} style={{width:3,height:3,borderRadius:'50%',background:selected?t.accentText:allCompleted?t.textSubtle:dColor}}/>))}</div>)}
      </button>);
    })}</div>
  </div>

  {selectedDayExams.length > 0 ? (<div className="fade-in"><h3 style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:t.textMuted, margin:'0 0 10px', textTransform:'uppercase'}}>{selectedDay} ב{HEBREW_MONTHS[month]}</h3><div style={{display:'flex', flexDirection:'column', gap:8}}>{selectedDayExams.map(exam => { const [c1] = getSubjectGradient(exam.subject); return (<div key={exam.id} style={{background:t.card, borderRadius:14, padding:'12px 14px', border:`1px solid ${t.border}`, display:'flex', alignItems:'center', gap:12, opacity:exam.completed?0.6:1, backdropFilter:'blur(20px)'}}>
    <div style={{fontSize:22}}>{getSubjectEmoji(exam.subject)}</div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontWeight:700, fontSize:14, color:t.text, textDecoration:exam.completed?'line-through':'none'}}>{exam.subject}</div>
      <div className="num" style={{fontSize:12, color:t.textMuted, marginTop:2}}>{formatTime(exam.datetime)}</div>
    </div>
  </div>); })}</div></div>) : monthExams.length > 0 ? (<div className="fade-in"><h3 style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:t.textMuted, margin:'0 0 10px', textTransform:'uppercase'}}>מבחני {HEBREW_MONTHS[month]} · {monthExams.length}</h3><div style={{display:'flex', flexDirection:'column', gap:8}}>{[...monthExams].sort((a,b) => new Date(a.datetime) - new Date(b.datetime)).map(exam => { const d = new Date(exam.datetime); const [c1] = getSubjectGradient(exam.subject); return (<div key={exam.id} style={{background:t.card, borderRadius:14, padding:'10px 14px', border:`1px solid ${t.border}`, display:'flex', alignItems:'center', gap:12, opacity:exam.completed?0.55:1, backdropFilter:'blur(20px)'}}>
    <div className="num" style={{minWidth:36, textAlign:'center', fontSize:22, fontWeight:800, lineHeight:1, color:exam.completed?t.textSubtle:c1, letterSpacing:'-0.03em'}}>{d.getDate()}</div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontWeight:700, fontSize:14, color:t.text, textDecoration:exam.completed?'line-through':'none', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{getSubjectEmoji(exam.subject)} {exam.subject}</div>
      <div style={{fontSize:11, color:t.textMuted}}>יום {HEBREW_DAYS[d.getDay()]} · <span className="num">{formatTime(exam.datetime)}</span></div>
    </div>
  </div>); })}</div></div>) : (<div style={{textAlign:'center', padding:'32px 20px', color:t.textMuted, fontSize:14}}>אין מבחנים בחודש {HEBREW_MONTHS[month]}</div>)}
</div>);
}

function ExamForm({ exam, t, darkMode, onSave, onCancel }) {
const [subject, setSubject] = useState(exam?.subject || '');
const [date, setDate] = useState(exam ? new Date(exam.datetime).toISOString().split('T')[0] : '');
const [time, setTime] = useState(exam ? new Date(exam.datetime).toTimeString().slice(0,5) : '09:00');
const [duration, setDuration] = useState(exam?.duration || 120);
const [note, setNote] = useState(exam?.note || '');
const [error, setError] = useState('');
const submit = () => { if (!subject.trim()) return setError('נא להזין שם של מקצוע'); if (!date) return setError('נא לבחור תאריך'); onSave({ subject:subject.trim(), datetime:new Date(`${date}T${time}:00`).toISOString(), duration:parseInt(duration)||120, note:note.trim() }); };
const inputStyle = { width:'100%', padding:'13px 14px', background:t.surface1, color:t.text, border:`1px solid ${t.border}`, borderRadius:12, fontSize:15, direction:'rtl', transition:'all 0.2s' };
return (<div className="fade-in" onClick={onCancel} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(12px)', zIndex:100, display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
  <div onClick={e => e.stopPropagation()} dir="rtl" style={{background:t.cardSolid, width:'100%', maxWidth:520, borderRadius:'28px 28px 0 0', padding:'20px 20px 28px', maxHeight:'92vh', overflowY:'auto', animation:'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)', paddingBottom:'calc(28px + env(safe-area-inset-bottom))', backdropFilter:'blur(20px)'}}>
    <div style={{width:40, height:4, background:t.borderStrong, borderRadius:2, margin:'0 auto 18px'}}/>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
      <h3 style={{margin:0, fontSize:22, fontWeight:800, letterSpacing:'-0.02em', color:t.text}}>{exam?'עריכת מבחן':'מבחן חדש'}</h3>
      <button onClick={onCancel} className="icon-btn press" style={{width:36,height:36,color:t.textMuted,background:t.surface1}}><Icon name="X" size={18}/></button>
    </div>
    <div style={{display:'flex', flexDirection:'column', gap:14}}>
      <Field label="מקצוע" t={t}><input type="text" value={subject} onChange={e => { setSubject(e.target.value); setError(''); }} placeholder="למשל: מתמטיקה 5 יחידות" style={inputStyle} autoFocus/></Field>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        <Field label="תאריך" t={t}><input type="date" value={date} onChange={e => { setDate(e.target.value); setError(''); }} style={inputStyle}/></Field>
        <Field label="שעה" t={t}><input type="time" value={time} onChange={e => setTime(e.target.value)} style={inputStyle}/></Field>
      </div>
      <Field label="משך (דקות)" t={t}><input type="number" value={duration} min="15" max="600" step="15" onChange={e => setDuration(e.target.value)} style={inputStyle}/></Field>
      <Field label="מיקום / הערה" t={t}><textarea value={note} onChange={e => setNote(e.target.value)} placeholder="כתובת של מקום המבחן" rows={2} style={{...inputStyle, resize:'none', minHeight:60}}/></Field>
      {error && (<div style={{color:'#EF4444', fontSize:13, padding:'10px 12px', background:'#EF444415', borderRadius:10, fontWeight:600}}>{error}</div>)}
      <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:10, marginTop:6}}>
        <button onClick={onCancel} className="press" style={{padding:14, background:t.surface1, color:t.text, border:`1px solid ${t.border}`, borderRadius:12, fontSize:15, fontWeight:600}}>ביטול</button>
        <button onClick={submit} className="press" style={{padding:14, background:`linear-gradient(135deg, ${t.accent}, #A855F7)`, color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:700, boxShadow:'0 8px 20px rgba(99,102,241,0.3)'}}>{exam?'שמור שינויים':'הוסף מבחן'}</button>
      </div>
    </div>
  </div>
</div>);
}

function Field({ label, t, children }) { return (<label style={{display:'block'}}><div style={{fontSize:11, fontWeight:700, color:t.textMuted, marginBottom:6, letterSpacing:'0.08em', textTransform:'uppercase'}}>{label}</div>{children}</label>); }

function ImportModal({ t, darkMode, onImport, onCancel }) {
const [mode, setMode] = useState('select');
const [fileName, setFileName] = useState('');
const [extracted, setExtracted] = useState([]);
const [error, setError] = useState('');
const processFile = async (file) => {
setMode('processing'); setError(''); setFileName(file.name);
try {
if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) throw new Error('רק קבצי PDF נתמכים');
const pdfjs = await loadPdfJs();
const arrayBuffer = await file.arrayBuffer();
const pdf = await pdfjs.getDocument({data: arrayBuffer}).promise;
let fullText = '';
for (let i = 1; i <= pdf.numPages; i++) { const page = await pdf.getPage(i); const content = await page.getTextContent(); fullText += content.items.map(it => it.str).join(' ') + ' '; }
const parsed = parseBagrutText(fullText);
if (parsed.length === 0) throw new Error('לא זוהו מבחנים במסמך');
setExtracted(parsed.map((e, i) => ({ ...e, selected: true, tempId: i }))); setMode('preview');
} catch (e) { setError(e.message || 'שגיאה'); setMode('error'); }
};
const toggle = (id) => setExtracted(extracted.map(e => e.tempId === id ? {...e, selected:!e.selected} : e));
const handleConfirm = () => { const sel = extracted.filter(e => e.selected); if (sel.length === 0) return; onImport(sel.map(({subject, datetime, note}) => ({subject, datetime, note}))); };
const selectedCount = extracted.filter(e => e.selected).length;
return (<div className="fade-in" onClick={onCancel} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(12px)', zIndex:100, display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
  <div onClick={e => e.stopPropagation()} dir="rtl" style={{background:t.cardSolid, width:'100%', maxWidth:520, borderRadius:'28px 28px 0 0', padding:'20px 20px 28px', maxHeight:'92vh', overflowY:'auto', animation:'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)', paddingBottom:'calc(28px + env(safe-area-inset-bottom))'}}>
    <div style={{width:40, height:4, background:t.borderStrong, borderRadius:2, margin:'0 auto 18px'}}/>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
      <h3 style={{margin:0, fontSize:22, fontWeight:800, letterSpacing:'-0.02em', color:t.text}}>{mode==='select'?'ייבוא מ-PDF':mode==='processing'?'מנתח...':mode==='preview'?'אישור':'שגיאה'}</h3>
      <button onClick={onCancel} className="icon-btn press" style={{width:36,height:36,color:t.textMuted,background:t.surface1}}><Icon name="X" size={18}/></button>
    </div>
    {mode==='select' && (<div style={{display:'flex', flexDirection:'column', gap:12}}>
      <p style={{fontSize:14, color:t.textMuted, margin:0, lineHeight:1.5}}>העלה את ה-PDF של הודעת הרישום ממשרד החינוך — האפליקציה תזהה אוטומטית.</p>
      <label className="press" style={{display:'flex', alignItems:'center', gap:14, padding:'18px 16px', background:`linear-gradient(135deg, ${t.accent}10, #A855F710)`, border:`2px dashed ${t.accent}50`, borderRadius:16, cursor:'pointer'}}>
        <div style={{width:48, height:48, borderRadius:14, background:t.accent, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}><Icon name="Upload" size={22}/></div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700, fontSize:15, color:t.text}}>בחר קובץ PDF</div>
          <div style={{fontSize:12, color:t.textMuted, marginTop:2}}>הודעת רישום ממשרד החינוך</div>
        </div>
        <input type="file" accept="application/pdf,.pdf" onChange={e => e.target.files?.[0] && processFile(e.target.files[0])} style={{display:'none'}}/>
      </label>
      <div style={{fontSize:11, color:t.textSubtle, textAlign:'center', lineHeight:1.5}}>🔒 העיבוד במכשיר שלך בלבד — שום נתון לא נשלח</div>
    </div>)}
    {mode==='processing' && (<div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'40px 20px', gap:16}}>
      <div style={{width:56, height:56, borderRadius:16, background:`linear-gradient(135deg, ${t.accent}, #A855F7)`, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}><Icon name="Loader2" size={26} style={{animation:'spin 1s linear infinite'}}/></div>
      <div style={{textAlign:'center'}}><div style={{fontSize:17, fontWeight:700, color:t.text}}>מזהה מבחנים...</div><div style={{fontSize:12, color:t.textMuted, marginTop:4}}>{fileName}</div></div>
    </div>)}
    {mode==='preview' && (<div style={{display:'flex', flexDirection:'column', gap:10}}>
      <p style={{fontSize:13, color:t.textMuted, margin:0}}>נמצאו {extracted.length} מבחנים</p>
      <div style={{display:'flex', flexDirection:'column', gap:6, maxHeight:'50vh', overflowY:'auto'}}>{extracted.map(exam => (<button key={exam.tempId} onClick={() => toggle(exam.tempId)} className="press" style={{display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:exam.selected?`${t.accent}10`:t.surface1, border:`1px solid ${exam.selected?t.accent:t.border}`, borderRadius:12, cursor:'pointer', fontFamily:'inherit', color:t.text, textAlign:'right'}}>
        <div style={{width:20,height:20,borderRadius:6,background:exam.selected?t.accent:'transparent',border:`2px solid ${exam.selected?t.accent:t.borderStrong}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{exam.selected && <Icon name="Check" size={11} color="#fff" strokeWidth={3}/>}</div>
        <div style={{fontSize:18}}>{getSubjectEmoji(exam.subject)}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700, fontSize:14, marginBottom:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{exam.subject}</div>
          <div className="num" style={{fontSize:11, color:t.textMuted}}>יום {getDayOfWeek(exam.datetime)} · {formatHebrewDate(exam.datetime)} · {formatTime(exam.datetime)}</div>
        </div>
      </button>))}</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:10, marginTop:8}}>
        <button onClick={() => setMode('select')} className="press" style={{padding:14, background:t.surface1, color:t.text, border:`1px solid ${t.border}`, borderRadius:12, fontSize:15, fontWeight:600}}>ביטול</button>
        <button onClick={handleConfirm} disabled={selectedCount===0} className="press" style={{padding:14, background:selectedCount===0?t.surface1:`linear-gradient(135deg, ${t.accent}, #A855F7)`, color:selectedCount===0?t.textMuted:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:700, cursor:selectedCount===0?'not-allowed':'pointer'}}>הוסף {selectedCount}</button>
      </div>
    </div>)}
    {mode==='error' && (<div style={{display:'flex', flexDirection:'column', gap:12}}>
      <div style={{display:'flex', alignItems:'flex-start', gap:12, padding:'14px', background:'#EF444415', border:'1px solid #EF444430', borderRadius:12}}><Icon name="AlertCircle" size={18} style={{color:'#EF4444', marginTop:2}}/><div style={{fontSize:14, color:t.text, lineHeight:1.5}}>{error}</div></div>
      <button onClick={() => { setMode('select'); setError(''); }} className="press" style={{padding:14, background:`linear-gradient(135deg, ${t.accent}, #A855F7)`, color:'#fff', border:'none', borderRadius:12, fontSize:15, fontWeight:700}}>נסה שוב</button>
    </div>)}
  </div>
</div>);
}

function BreathingModal({ t, darkMode, onClose }) {
const [phase, setPhase] = useState('inhale');
useEffect(() => { const phases = ['inhale','hold','exhale']; let i = 0; const interval = setInterval(() => { i = (i+1) % 3; setPhase(phases[i]); }, 4000); return () => clearInterval(interval); }, []);
const phaseText = {inhale:'שאף',hold:'החזק',exhale:'נשוף'};
return (<div className="fade-in" onClick={onClose} style={{position:'fixed', inset:0, background:'rgba(10,10,20,0.95)', backdropFilter:'blur(20px)', zIndex:200, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
  <div style={{width:280, height:280, borderRadius:'50%', background:`radial-gradient(circle, ${t.accent}, #A855F7, transparent 70%)`, animation:'breathe 12s ease-in-out infinite', display:'flex', alignItems:'center', justifyContent:'center'}}>
    <div style={{fontSize:36, fontWeight:800, color:'#fff', letterSpacing:'-0.03em'}}>{phaseText[phase]}</div>
  </div>
  <div style={{marginTop:48, color:'rgba(255,255,255,0.8)', fontSize:14, textAlign:'center', maxWidth:280, lineHeight:1.5}}>4 שאיפה · 4 החזקה · 4 נשיפה<br/><span style={{opacity:0.6, fontSize:12}}>לחץ בכל מקום לסיום</span></div>
</div>);
}

function PracticeModal({ exam, t, darkMode, onClose }) {
const category = getQuestionCategory(exam.subject);
const questions = category ? QUESTIONS[category] : null;
const [idx, setIdx] = useState(0);
const [showAnswer, setShowAnswer] = useState(false);
const [order, setOrder] = useState(() => questions ? [...Array(questions.length).keys()].sort(() => Math.random() - 0.5) : []);
if (!questions) return (<div className="fade-in" onClick={onClose} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(12px)', zIndex:100, display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
  <div onClick={e => e.stopPropagation()} dir="rtl" style={{background:t.cardSolid, width:'100%', maxWidth:520, borderRadius:'28px 28px 0 0', padding:'32px 24px', textAlign:'center'}}>
    <div style={{fontSize:48, marginBottom:12}}>🎓</div>
    <h3 style={{margin:'0 0 8px', color:t.text, fontSize:18, fontWeight:800}}>אין שאלות תרגול למקצוע הזה</h3>
    <p style={{fontSize:13, color:t.textMuted, margin:'0 0 20px'}}>זמין עבור: מתמטיקה, אנגלית, היסטוריה, תנ"ך, ספרות, מחשבת, אזרחות, דינים, תושבע"פ, תפילה, חינוך</p>
    <button onClick={onClose} className="press" style={{padding:'12px 24px', background:`linear-gradient(135deg, ${t.accent}, #A855F7)`, color:'#fff', border:'none', borderRadius:12, fontSize:14, fontWeight:700}}>סגור</button>
  </div>
</div>);
const currentQ = questions[order[idx]];
const [c1, c2] = getSubjectGradient(exam.subject);
const next = () => { haptic(); setShowAnswer(false); setIdx((idx+1) % order.length); };
const shuffle = () => { haptic(true); setShowAnswer(false); setIdx(0); setOrder([...Array(questions.length).keys()].sort(() => Math.random() - 0.5)); };
return (<div className="fade-in" onClick={onClose} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(12px)', zIndex:100, display:'flex', alignItems:'flex-end', justifyContent:'center'}}>
  <div onClick={e => e.stopPropagation()} dir="rtl" style={{background:t.cardSolid, width:'100%', maxWidth:520, borderRadius:'28px 28px 0 0', padding:'20px 20px 28px', maxHeight:'92vh', overflowY:'auto', animation:'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)', paddingBottom:'calc(28px + env(safe-area-inset-bottom))'}}>
    <div style={{width:40, height:4, background:t.borderStrong, borderRadius:2, margin:'0 auto 18px'}}/>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
      <div>
        <div style={{fontSize:10, color:t.textMuted, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase'}}>תרגול</div>
        <h3 style={{margin:'2px 0 0', fontSize:18, fontWeight:800, color:t.text}}>{getSubjectEmoji(exam.subject)} {exam.subject}</h3>
      </div>
      <button onClick={onClose} className="icon-btn press" style={{width:36,height:36,color:t.textMuted,background:t.surface1}}><Icon name="X" size={18}/></button>
    </div>
    <div style={{display:'flex', justifyContent:'space-between', fontSize:12, color:t.textMuted, marginBottom:8}}>
      <span className="num">שאלה {idx+1}/{questions.length}</span>
      <span className="num">{Math.round(((idx+1)/questions.length)*100)}%</span>
    </div>
    <div style={{height:4, background:t.surface2, borderRadius:99, marginBottom:18, overflow:'hidden'}}>
      <div style={{width:`${((idx+1)/questions.length)*100}%`, height:'100%', background:`linear-gradient(90deg, ${c1}, ${c2})`, transition:'width 0.4s cubic-bezier(0.16,1,0.3,1)'}}/>
    </div>
    <div onClick={() => { haptic(); setShowAnswer(!showAnswer); }} style={{background:showAnswer?`linear-gradient(135deg, ${c1}20, ${c2}20)`:t.surface1, border:`2px solid ${showAnswer?c1:t.border}`, borderRadius:20, padding:'32px 22px', minHeight:220, display:'flex', flexDirection:'column', justifyContent:'center', cursor:'pointer', marginBottom:14, transition:'all 0.3s ease'}}>
      <div style={{fontSize:10, color:showAnswer?c1:t.textMuted, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12, textAlign:'center'}}>{showAnswer?'✨ תשובה':'❓ שאלה'}</div>
      <div style={{fontSize:showAnswer?17:19, fontWeight:showAnswer?600:700, color:t.text, lineHeight:1.5, textAlign:'center', letterSpacing:'-0.01em'}}>{showAnswer?currentQ.a:currentQ.q}</div>
      <div style={{fontSize:11, color:t.textSubtle, marginTop:16, textAlign:'center'}}>{showAnswer?'↩ לחץ לשאלה':'👆 לחץ לתשובה'}</div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:10}}>
      <button onClick={shuffle} className="press" style={{padding:14, background:t.surface1, color:t.text, border:`1px solid ${t.border}`, borderRadius:12, fontSize:14, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6}}><Icon name="RotateCw" size={14}/>ערבב</button>
      <button onClick={next} className="press" style={{padding:14, background:`linear-gradient(135deg, ${c1}, ${c2})`, color:'#fff', border:'none', borderRadius:12, fontSize:14, fontWeight:700}}>הבא ←</button>
    </div>
  </div>
</div>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
