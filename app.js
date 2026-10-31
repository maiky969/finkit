/* Finkit — личные финансы. Данные лежат только в localStorage этого телефона.
   Суммы храним в филсах (1 AED = 100 филсов) целыми числами, чтобы не было ошибок округления. */
(function () {
  'use strict';

  var KEY = 'finkit:v1';
  var VERSION = '1.3';

  /* ---------- Тексты ---------- */
  var I18N = {
    ru: {
      tabHome: 'Главная', tabOverview: 'Обзор', tabAdd: 'Добавить', tabGoals: 'Цели', tabDebts: 'Долги',
      prevMonth: 'Предыдущий месяц', nextMonth: 'Следующий месяц', settings: 'Настройки',
      leftInBudget: 'Осталось в бюджете', overBudget: 'Перерасход', monthBalance: 'Баланс месяца', monthResult: 'Итог месяца',
      paceOk: 'Идёшь по графику', paceWarn: 'Тратишь быстрее, чем идёт месяц', paceOver: 'Бюджет на месяц превышен',
      perDay: 'Можно тратить ≈ {x} в день до конца месяца',
      paceDetail: 'Потрачено {s}% бюджета, а месяц прошёл на {d}%',
      overDetail: 'Сверх бюджета {x}',
      pastOk: 'Уложился в бюджет', pastOver: 'Вышел за бюджет',
      pastDetail: 'Потрачено {x} из {b}',
      spentPct: 'потрачено {p}%',
      mustPay: 'Обязательные платежи', paidOf: 'оплачено {a} из {b}', paid: 'Оплачено', notPaid: 'Не оплачено', partPaid: 'Внесено {x}',
      payNow: 'Записать платёж', manage: 'Изменить список', addObl: 'Добавить платёж', oblName: 'Название', oblNamePh: 'Например, аренда',
      oblAmount: 'Сумма в месяц', oblHint: 'Платежи по ипотеке и кредитам берутся из раздела «Долги».', remove: 'Убрать', add: 'Добавить',
      oblSaved: 'Платёж добавлен', oblRemoved: 'Платёж убран', budgetNote: 'Только траты на жизнь. Обязательные платежи считаются отдельно.',
      needName: 'Напиши название и сумму',
      budgetTitle: 'Бюджет', monthShort: 'Месяц', yearShort: 'Год {y}', catLimits: 'Лимиты по категориям',
      ofLimit: '{x} из {b}', noLimit: 'без лимита', notSet: 'Не задан', setIt: 'Задать',
      leftShort: 'осталось {x}', overShort: 'сверх лимита {x}',
      yearBudget: 'Бюджет на год', catLimit: 'Лимит: {c}', limitHint: 'Лимит на месяц. Оставь пустым, чтобы убрать.',
      yearHint: 'Траты на жизнь за весь год, без обязательных платежей.',
      removeLimit: 'Убрать лимит', limitSaved: 'Лимит сохранён', limitRemoved: 'Лимит убран',
      limitNear: '{c}: {p}% лимита', limitOver: '{c}: лимит превышен',
      yearPassed: 'год прошёл на {p}%', catHint: 'Нажми на категорию, чтобы задать лимит на месяц.',
      pickGoal: 'Набери сумму и выбери копилку', saveTab: 'В копилку',
      confirmAdd: 'Добавить', needCat: 'Выбери категорию', needGoalPick: 'Выбери копилку', needAmount: 'Введи сумму',
      flowTitle: 'Доходы и расходы', flowHint: 'Нажми на месяц, чтобы посмотреть его подробно.', net: 'Итог',
      avgLine: 'В среднем за месяц: доход {i}, расход {o}', byCat: 'Траты по категориям', byCatHint: 'Траты на жизнь, без обязательных платежей и копилок.',
      otherCats: 'Остальное', chartLabel: 'Доходы и расходы за {n} мес.',
      debtLeftTotal: 'Осталось выплатить', perMonth: 'В месяц', debtFree: 'Без долгов', loans: 'Кредиты', addDebt: 'Добавить долг',
      debtOf: 'из {b} · выплачено {p}%', payment: 'Платёж', rate: 'Ставка', monthsLeft: 'Осталось', closeBy: 'Закроешь',
      monthsN: '≈ {n} мес.', interestAhead: 'Проценты впереди', paidThisMonth: 'Оплачено в этом месяце', notPaidThisMonth: 'В этом месяце не оплачено',
      noCover: 'Платёж не покрывает проценты', debtName: 'Название', debtNamePh: 'Например, автокредит', debtBalance: 'Остаток сейчас',
      debtOriginal: 'Сумма кредита', debtPayment: 'Платёж в месяц', debtRate: 'Ставка, % годовых', debtHint: 'Точный остаток смотри в приложении банка и правь здесь, когда нужно.',
      deleteDebt: 'Удалить долг', debtDeleteConfirm: 'Удалить «{n}»? Операции с платежами останутся в истории.', debtSaved: 'Долг сохранён', debtDeleted: 'Долг удалён',
      needDebtFields: 'Нужны название, остаток и платёж', noDebts: 'Добавь ипотеку и кредиты: приложение посчитает остаток, проценты и когда закроешь.', debtClosed: 'Закрыт', paidOff: 'Выплачено {x}', savePlan: 'План накоплений', savedOf: 'отложено {x} из {b}', planDone: 'План выполнен',
      saveLeft: 'ещё {x}', saveMonthTitle: 'Цель на месяц', saveYearTitle: 'Цель на год',
      saveHint: 'Сколько хочешь откладывать. Считаются пополнения копилок.',
      piggies: 'Копилки', newGoal: 'Новая цель', goalName: 'Название', goalNamePh: 'Например, машина',
      goalTarget: 'Сколько нужно', goalStart: 'Уже накоплено', goalDue: 'Срок (необязательно)',
      goalOf: '{x} из {b}', goalDone: 'Цель достигнута', perMonthNeed: 'Откладывай ≈ {x} в месяц до {d}', dueBy: 'до {d}',
      dueMissed: 'Срок {d} прошёл',
      topUp: 'Пополнить', withdraw: 'Снять', amount: 'Сумма', editGoal: 'Изменить', deleteGoal: 'Удалить цель',
      goalDeleteConfirm: 'Удалить цель «{n}» вместе с историей пополнений?', goalSaved: 'Цель сохранена', goalDeleted: 'Цель удалена',
      moved: 'Отложено · {g} {x}', movedOut: 'Снято · {g} {x}', notEnough: 'В копилке только {x}', history: 'Движения',
      noGoalsYet: 'Пока нет копилок. Создай первую цель, например «Машина».', needGoal: 'Сначала создай копилку',
      fromGoal: 'Из копилки', toGoal: 'В копилку', savedMonth: 'Отложено в копилки', create: 'Создать',
      needGoalFields: 'Напиши название и сумму цели',
      setBudget: 'Задать бюджет на месяц',
      noBudgetHint: 'С бюджетом будет видно, сколько осталось и не тратишь ли ты быстрее, чем идёт месяц.',
      income: 'Доход', expense: 'Расход',
      whereMoney: 'Куда ушли деньги', operations: 'Операции', opsCount: '{n}',
      emptyOps: 'Пока пусто. Нажми «+», чтобы добавить первую операцию.',
      emptyOpsPast: 'В этом месяце операций нет.',
      today: 'Сегодня', yesterday: 'Вчера', note: 'Заметка',
      newOp: 'Новая операция', editOp: 'Операция', save: 'Сохранить', del: 'Удалить', close: 'Закрыть',
      pickCategory: 'Набери сумму и выбери категорию', pickCategoryEdit: 'Можно поменять сумму, категорию или дату',
      enterAmount: 'Сначала введи сумму', whichDebt: 'Какой платёж?',
      added: 'Добавлено', deleted: 'Удалено', undo: 'Отменить', saved: 'Сохранено',
      language: 'Язык', theme: 'Тема', themeAuto: 'Авто', themeLight: 'Светлая', themeDark: 'Тёмная',
      monthBudget: 'Бюджет на месяц', budgetPlaceholder: 'Не задан', budgetSaved: 'Бюджет сохранён', budgetCleared: 'Бюджет убран',
      data: 'Данные', exportData: 'Сохранить копию', importData: 'Загрузить копию',
      importOk: 'Копия загружена', importBad: 'Не получилось прочитать файл. Нужна копия Finkit (.json).',
      importConfirm: 'Заменить все данные на этом телефоне данными из копии?',
      dataNote: 'Всё хранится только на этом телефоне. Время от времени сохраняй копию в «Файлы».',
      version: 'Finkit {v}',
      helloTitle: 'Привет! Это Finkit',
      helloText: 'Все деньги месяца на одном экране. Данные хранятся только на этом телефоне.',
      budgetQ: 'Сколько планируешь тратить в месяц?',
      budgetQHint: 'Поменять можно в любой момент в настройках.',
      next: 'Дальше', skip: 'Пропустить', start: 'Поехали',
      cat: {
        groceries: 'Продукты', cafe: 'Кафе и рестораны', transport: 'Транспорт и такси', housing: 'Жильё и коммуналка',
        phone: 'Связь и интернет', health: 'Здоровье', shopping: 'Покупки', fun: 'Развлечения',
        travel: 'Путешествия', transfers: 'Переводы', debt: 'Обязательный платёж', other: 'Другое',
        salary: 'Зарплата', incomeOther: 'Другой доход'
      },
      debt: { mortgage: 'Ипотека', loan: 'Кредит' }
    },
    en: {
      tabHome: 'Home', tabOverview: 'Overview', tabAdd: 'Add', tabGoals: 'Goals', tabDebts: 'Debts',
      prevMonth: 'Previous month', nextMonth: 'Next month', settings: 'Settings',
      leftInBudget: 'Left in budget', overBudget: 'Over budget', monthBalance: 'Month balance', monthResult: 'Month result',
      paceOk: 'On track', paceWarn: 'Spending faster than the month goes', paceOver: 'Monthly budget exceeded',
      perDay: 'You can spend ≈ {x} a day until month end',
      paceDetail: '{s}% of budget spent, {d}% of the month gone',
      overDetail: '{x} over budget',
      pastOk: 'Stayed within budget', pastOver: 'Went over budget',
      pastDetail: 'Spent {x} of {b}',
      spentPct: '{p}% spent',
      mustPay: 'Fixed payments', paidOf: '{a} of {b} paid', paid: 'Paid', notPaid: 'Not paid', partPaid: '{x} paid',
      payNow: 'Record payment', manage: 'Edit list', addObl: 'Add payment', oblName: 'Name', oblNamePh: 'e.g. Rent',
      oblAmount: 'Monthly amount', oblHint: 'Mortgage and loan payments come from the Debts section.', remove: 'Remove', add: 'Add',
      oblSaved: 'Payment added', oblRemoved: 'Payment removed', budgetNote: 'Living expenses only. Fixed payments are tracked separately.',
      needName: 'Enter a name and an amount',
      budgetTitle: 'Budget', monthShort: 'Month', yearShort: 'Year {y}', catLimits: 'Category limits',
      ofLimit: '{x} of {b}', noLimit: 'no limit', notSet: 'Not set', setIt: 'Set',
      leftShort: '{x} left', overShort: '{x} over',
      yearBudget: 'Yearly budget', catLimit: 'Limit: {c}', limitHint: 'Monthly limit. Leave empty to remove it.',
      yearHint: 'Living expenses for the whole year, fixed payments excluded.',
      removeLimit: 'Remove limit', limitSaved: 'Limit saved', limitRemoved: 'Limit removed',
      limitNear: '{c}: {p}% of limit', limitOver: '{c}: limit exceeded',
      yearPassed: '{p}% of the year gone', catHint: 'Tap a category to set a monthly limit.',
      pickGoal: 'Enter an amount and pick a goal', saveTab: 'Save',
      confirmAdd: 'Add', needCat: 'Pick a category', needGoalPick: 'Pick a goal', needAmount: 'Enter an amount',
      flowTitle: 'Income and spending', flowHint: 'Tap a month to see it in detail.', net: 'Net',
      avgLine: 'Monthly average: income {i}, spending {o}', byCat: 'Spending by category', byCatHint: 'Living expenses, excluding fixed payments and goals.',
      otherCats: 'Everything else', chartLabel: 'Income and spending over {n} months',
      debtLeftTotal: 'Left to repay', perMonth: 'Per month', debtFree: 'Debt-free', loans: 'Loans', addDebt: 'Add a debt',
      debtOf: 'of {b} · {p}% repaid', payment: 'Payment', rate: 'Rate', monthsLeft: 'Left', closeBy: 'Paid off',
      monthsN: '≈ {n} mo', interestAhead: 'Interest ahead', paidThisMonth: 'Paid this month', notPaidThisMonth: 'Not paid this month',
      noCover: 'Payment doesn’t cover interest', debtName: 'Name', debtNamePh: 'e.g. Car loan', debtBalance: 'Balance now',
      debtOriginal: 'Loan amount', debtPayment: 'Monthly payment', debtRate: 'Interest rate, % a year', debtHint: 'Check the exact balance in your bank app and update it here when needed.',
      deleteDebt: 'Delete debt', debtDeleteConfirm: 'Delete “{n}”? Payment transactions stay in the history.', debtSaved: 'Debt saved', debtDeleted: 'Debt deleted',
      needDebtFields: 'Name, balance and payment are required', noDebts: 'Add your mortgage and loans: the app will track the balance, interest and payoff date.', debtClosed: 'Closed', paidOff: '{x} repaid', savePlan: 'Savings plan', savedOf: '{x} of {b} saved', planDone: 'Plan reached',
      saveLeft: '{x} to go', saveMonthTitle: 'Monthly target', saveYearTitle: 'Yearly target',
      saveHint: 'How much you want to put aside. Goal top-ups count.',
      piggies: 'Goals', newGoal: 'New goal', goalName: 'Name', goalNamePh: 'e.g. Car',
      goalTarget: 'Target amount', goalStart: 'Already saved', goalDue: 'Deadline (optional)',
      goalOf: '{x} of {b}', goalDone: 'Goal reached', perMonthNeed: 'Save ≈ {x} a month until {d}', dueBy: 'by {d}',
      dueMissed: 'Deadline {d} has passed',
      topUp: 'Top up', withdraw: 'Withdraw', amount: 'Amount', editGoal: 'Edit', deleteGoal: 'Delete goal',
      goalDeleteConfirm: 'Delete “{n}” together with its top-up history?', goalSaved: 'Goal saved', goalDeleted: 'Goal deleted',
      moved: 'Saved · {g} {x}', movedOut: 'Withdrawn · {g} {x}', notEnough: 'Only {x} in this goal', history: 'Activity',
      noGoalsYet: 'No goals yet. Create your first one, e.g. “Car”.', needGoal: 'Create a goal first',
      fromGoal: 'From goal', toGoal: 'To goal', savedMonth: 'Saved to goals', create: 'Create',
      needGoalFields: 'Enter a name and a target amount',
      setBudget: 'Set a monthly budget',
      noBudgetHint: 'With a budget you’ll see what’s left and whether you’re spending faster than the month goes.',
      income: 'Income', expense: 'Spending',
      whereMoney: 'Where the money went', operations: 'Transactions', opsCount: '{n}',
      emptyOps: 'Nothing yet. Tap “+” to add your first transaction.',
      emptyOpsPast: 'No transactions this month.',
      today: 'Today', yesterday: 'Yesterday', note: 'Note',
      newOp: 'New transaction', editOp: 'Transaction', save: 'Save', del: 'Delete', close: 'Close',
      pickCategory: 'Enter an amount and pick a category', pickCategoryEdit: 'Change the amount, category or date',
      enterAmount: 'Enter an amount first', whichDebt: 'Which payment is it?',
      added: 'Added', deleted: 'Deleted', undo: 'Undo', saved: 'Saved',
      language: 'Language', theme: 'Theme', themeAuto: 'Auto', themeLight: 'Light', themeDark: 'Dark',
      monthBudget: 'Monthly budget', budgetPlaceholder: 'Not set', budgetSaved: 'Budget saved', budgetCleared: 'Budget removed',
      data: 'Data', exportData: 'Save a backup', importData: 'Load a backup',
      importOk: 'Backup loaded', importBad: 'Couldn’t read the file. It must be a Finkit backup (.json).',
      importConfirm: 'Replace all data on this phone with the backup?',
      dataNote: 'Everything lives only on this phone. Save a backup to Files now and then.',
      version: 'Finkit {v}',
      helloTitle: 'Hi! This is Finkit',
      helloText: 'Your whole month of money on one screen. Data stays on this phone only.',
      budgetQ: 'How much do you plan to spend a month?',
      budgetQHint: 'You can change it any time in settings.',
      next: 'Next', skip: 'Skip', start: 'Let’s go',
      cat: {
        groceries: 'Groceries', cafe: 'Cafés & dining', transport: 'Transport & taxi', housing: 'Housing & utilities',
        phone: 'Phone & internet', health: 'Health', shopping: 'Shopping', fun: 'Entertainment',
        travel: 'Travel', transfers: 'Transfers', debt: 'Fixed payment', other: 'Other',
        salary: 'Salary', incomeOther: 'Other income'
      },
      debt: { mortgage: 'Mortgage', loan: 'Loan' }
    }
  };

  // Стартовые категории: key — для перевода, h — оттенок значка
  var DEFAULT_CATS = [
    { id: 'groceries', type: 'out', icon: 'cart', h: 150 },
    { id: 'cafe', type: 'out', icon: 'cup', h: 55 },
    { id: 'transport', type: 'out', icon: 'car', h: 230 },
    { id: 'housing', type: 'out', icon: 'house', h: 30 },
    { id: 'phone', type: 'out', icon: 'phone', h: 200 },
    { id: 'health', type: 'out', icon: 'heart', h: 10 },
    { id: 'shopping', type: 'out', icon: 'bag', h: 320 },
    { id: 'fun', type: 'out', icon: 'ticket', h: 290 },
    { id: 'travel', type: 'out', icon: 'suitcase', h: 260 },
    { id: 'transfers', type: 'out', icon: 'transfer', h: 180 },
    { id: 'debt', type: 'out', icon: 'bank', h: 250 },
    { id: 'other', type: 'out', icon: 'dots', h: 245 },
    { id: 'salary', type: 'in', icon: 'wallet', h: 160 },
    { id: 'incomeOther', type: 'in', icon: 'coins', h: 120 }
  ];

  /* ---------- Состояние ---------- */
  var data = load();
  var ui = {
    tab: 'home',
    month: monthKey(new Date()),
    intro: true, // анимация темпа при первом показе
    welcomeStep: 0,
    sheet: null
  };

  function freshData() {
    return {
      v: 1,
      lang: (navigator.language || 'ru').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en',
      theme: 'auto',
      onboarded: false,
      categories: DEFAULT_CATS.map(function (c) { return Object.assign({}, c); }),
      tx: [],
      budget: { month: null, year: null, cats: {} },
      savings: { month: null, year: null },
      goals: [],
      obligations: [],
      debts: []
    };
  }

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (raw && raw.v === 1 && Array.isArray(raw.tx)) return normalize(raw);
    } catch (e) {}
    return freshData();
  }

  // Достраиваем то, чего нет в старых копиях
  function normalize(d) {
    var base = freshData();
    Object.keys(base).forEach(function (k) { if (d[k] === undefined) d[k] = base[k]; });
    d.budget = Object.assign({ month: null, year: null, cats: {} }, d.budget);
    return d;
  }

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }

  /* ---------- Помощники ---------- */
  function t(key, vars) {
    var dict = I18N[data.lang] || I18N.ru;
    var s = key.split('.').reduce(function (o, k) { return o && o[k]; }, dict);
    if (s == null) s = key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  function locale() { return data.lang === 'ru' ? 'ru-RU' : 'en-GB'; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(id, cls) { return '<svg class="ico' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function isoDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function monthKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1); }
  function parseISO(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +(p[2] || 1)); }
  function shiftMonth(key, delta) { var d = parseISO(key + '-01'); d.setMonth(d.getMonth() + delta); return monthKey(d); }
  function daysInMonth(key) { var d = parseISO(key + '-01'); return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function monthTitle(key) {
    var d = parseISO(key + '-01');
    var name = cap(new Intl.DateTimeFormat(locale(), { month: 'long' }).format(d));
    return d.getFullYear() === new Date().getFullYear() ? name : name + ' ' + d.getFullYear();
  }
  function dayTitle(iso) {
    var today = isoDate(new Date());
    var y = new Date(); y.setDate(y.getDate() - 1);
    if (iso === today) return t('today');
    if (iso === isoDate(y)) return t('yesterday');
    var d = parseISO(iso);
    var opts = { day: 'numeric', month: 'long' };
    if (d.getFullYear() !== new Date().getFullYear()) opts.year = 'numeric';
    return new Intl.DateTimeFormat(locale(), opts).format(d);
  }
  function shortDay(key, day) {
    return new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'short' }).format(parseISO(key + '-' + pad(day))).replace('.', '');
  }

  // Деньги: 12345 филсов → «123,45». parts — для крупного вида с мелкими копейками
  function moneyParts(fils) {
    var abs = Math.abs(Math.round(fils));
    var whole = Math.floor(abs / 100);
    var dec = abs % 100;
    return {
      int: new Intl.NumberFormat(locale()).format(whole),
      dec: dec ? (data.lang === 'ru' ? ',' : '.') + pad(dec) : '',
      neg: fils < 0
    };
  }
  function money(fils, sign) {
    var p = moneyParts(fils);
    var pre = sign && fils > 0 ? '+' : (p.neg ? '−' : '');
    return pre + p.int + p.dec;
  }
  function moneyAED(fils, sign) { return 'AED ' + money(fils, sign); }
  function bigMoney(fils) {
    var p = moneyParts(fils);
    return '<span class="money-cur">AED</span><span class="money-big">' + (p.neg ? '−' : '') + p.int +
      (p.dec ? '<span class="money-dec">' + p.dec + '</span>' : '') + '</span>';
  }
  // «1 234,5» / «1234.50» → филсы
  function parseMoney(str) {
    if (str == null) return null;
    var clean = String(str).replace(/[\s  ]/g, '').replace(',', '.');
    if (!/^\d+(\.\d{0,2})?$/.test(clean)) return null;
    return Math.round(parseFloat(clean) * 100);
  }

  function catById(id) {
    for (var i = 0; i < data.categories.length; i++) if (data.categories[i].id === id) return data.categories[i];
    return { id: id, type: 'out', icon: 'dots', h: 245 };
  }
  function catName(c) { return c.name || t('cat.' + c.id); }
  function debtName(d) { return d.name || t('debt.' + d.key); }
  function catIco(c) { return '<span class="cat-ico" style="--h:' + c.h + '">' + icon('c-' + c.icon) + '</span>'; }

  function txOfMonth(key) { return data.tx.filter(function (x) { return x.date.slice(0, 7) === key; }); }
  function sums(list) {
    var r = { in: 0, out: 0, save: 0 };
    list.forEach(function (x) { r[x.type] += x.amount; });
    return r;
  }
  // Траты на жизнь: всё, кроме обязательных платежей (они в бюджет не входят)
  function isFixed(x) { return x.type === 'out' && x.cat === 'debt'; }
  function livingOut(list) { return list.reduce(function (a, x) { return a + (x.type === 'out' && !isFixed(x) ? x.amount : 0); }, 0); }

  // Все обязательные платежи: из долгов + добавленные вручную
  function payables() {
    return data.debts.filter(function (d) { return d.balance > 0 && d.payment > 0; }).map(function (d) {
      return { id: d.id, kind: 'debt', name: debtName(d), amount: d.payment, icon: 'bank', h: 250 };
    }).concat(data.obligations.map(function (o) {
      return { id: o.id, kind: 'obl', name: o.name, amount: o.amount, icon: 'house', h: 30 };
    }));
  }
  function payableById(id) { return payables().filter(function (p) { return p.id === id; })[0] || null; }
  function payTarget(x) { return x.debtId || x.oblId || null; }
  function paidFor(id, list) { return list.reduce(function (a, x) { return a + (payTarget(x) === id && x.type === 'out' ? x.amount : 0); }, 0); }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  /* ---------- Тема ---------- */
  function applyTheme() {
    var root = document.documentElement;
    if (data.theme === 'light' || data.theme === 'dark') root.setAttribute('data-theme', data.theme);
    else root.removeAttribute('data-theme');
    root.lang = data.lang;
    var dark = data.theme === 'dark' || (data.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute('content', dark ? '#121a26' : '#dce7f1');
    });
  }

  /* ---------- Отрисовка ---------- */
  var appEl = document.getElementById('app');
  var tabbarEl = document.getElementById('tabbar');

  function render() {
    applyTheme();
    document.body.classList.toggle('is-welcome', !data.onboarded);
    if (!data.onboarded) { appEl.innerHTML = renderWelcome(); return; }
    renderTabbar();
    var html = '';
    if (ui.tab === 'home') html = renderHome();
    else if (ui.tab === 'overview') html = renderOverview();
    else if (ui.tab === 'goals') html = renderGoals();
    else html = renderDebts();
    appEl.innerHTML = html;
    if (ui.tab === 'overview') drawFlowChart();
    if (ui.tab === 'home' && ui.intro) {
      // самолётик выезжает на своё место один раз при открытии
      var budgetEl = appEl.querySelector('.budget');
      if (budgetEl) {
        budgetEl.classList.add('is-intro');
        requestAnimationFrame(function () { requestAnimationFrame(function () { budgetEl.classList.remove('is-intro'); }); });
      }
      ui.intro = false;
    }
  }

  function renderTabbar() {
    var tabs = [
      { id: 'home', icon: 'i-home', label: t('tabHome') },
      { id: 'overview', icon: 'i-overview', label: t('tabOverview') },
      { id: 'add' },
      { id: 'goals', icon: 'i-goals', label: t('tabGoals') },
      { id: 'debts', icon: 'i-debts', label: t('tabDebts') }
    ];
    tabbarEl.setAttribute('aria-label', data.lang === 'ru' ? 'Разделы' : 'Sections');
    tabbarEl.className = 'tabbar glass';
    tabbarEl.innerHTML = tabs.map(function (tab) {
      if (tab.id === 'add') {
        return '<button class="tab-add" type="button" data-action="add" aria-label="' + esc(t('tabAdd')) + '"><span>' + icon('i-plus') + '</span></button>';
      }
      return '<button class="tab" type="button" data-action="tab" data-tab="' + tab.id + '"' +
        (ui.tab === tab.id ? ' aria-current="page"' : '') + '>' + icon(tab.icon) + '<span>' + esc(tab.label) + '</span></button>';
    }).join('');
  }

  function renderHome() {
    var key = ui.month;
    var nowKey = monthKey(new Date());
    var list = txOfMonth(key);
    var s = sums(list);

    var top = monthSwitch(key);

    return top + renderBudget(key, nowKey, { in: s.in, out: livingOut(list) }) + renderFlows(s) + renderSavedStrip(s) + renderFixed(list) + renderCategories(list) + renderOps(list, key === nowKey);
  }

  function renderBudget(key, nowKey, s) {
    var budget = data.budget.month;
    if (!budget) {
      var bal = s.in - s.out;
      return '<section class="budget glass budget-empty">' +
        '<p class="budget-label">' + esc(t('monthBalance')) + '</p>' +
        '<div class="budget-amount' + (bal < 0 ? ' is-over' : '') + '">' + bigMoney(bal) + '</div>' +
        '<p>' + esc(t('noBudgetHint')) + '</p>' +
        '<button class="btn btn-quiet" type="button" data-action="limit" data-key="month">' + esc(t('setBudget')) + '</button>' +
        '</section>';
    }

    var left = budget - s.out;
    var spentPct = Math.round((s.out / budget) * 100);
    var isCurrent = key === nowKey;
    var isPast = key < nowKey;
    var days = daysInMonth(key);
    var today = new Date().getDate();
    var dayPct = isCurrent ? Math.round((today / days) * 100) : (isPast ? 100 : 0);

    var tone, title, detail;
    if (left < 0) {
      tone = 'over';
      title = isPast ? t('pastOver') : t('paceOver');
      detail = t('overDetail', { x: moneyAED(-left) });
    } else if (isPast) {
      tone = 'ok';
      title = t('pastOk');
      detail = t('pastDetail', { x: moneyAED(s.out), b: moneyAED(budget) });
    } else if (spentPct > dayPct + 5) {
      tone = 'warn';
      title = t('paceWarn');
      detail = t('paceDetail', { s: spentPct, d: dayPct });
    } else {
      tone = 'ok';
      title = t('paceOk');
      var daysLeft = isCurrent ? days - today + 1 : days;
      detail = t('perDay', { x: moneyAED(Math.floor(left / daysLeft)) });
    }

    return '<section class="budget glass tone-' + tone + '">' +
      '<p class="budget-label">' + esc(left < 0 ? t('overBudget') : (isPast ? t('monthResult') : t('leftInBudget'))) + '</p>' +
      '<div class="budget-amount' + (left < 0 ? ' is-over' : '') + '">' + bigMoney(Math.abs(left)) + '</div>' +
      '<div class="pace" style="--day:' + dayPct + ';--spent:' + Math.min(spentPct, 100) + '">' +
      '<div class="pace-plane">' + icon('i-plane') + '</div>' +
      '<div class="pace-track"><div class="pace-fill"></div></div>' +
      '<div class="pace-ends"><span>' + esc(shortDay(key, 1)) + '</span><span>' + esc(t('spentPct', { p: spentPct })) + '</span><span>' + esc(shortDay(key, days)) + '</span></div>' +
      '</div>' +
      '<div class="pace-status"><i class="pace-dot"></i><div><strong>' + esc(title) + '</strong><span>' + esc(detail) + '</span></div></div>' +
      '</section>';
  }

  function renderFlows(s) {
    function flow(cls, ico, label, val) {
      var p = moneyParts(val);
      return '<div class="flow glass ' + cls + '"><div class="flow-head">' + icon(ico) + esc(label) + '</div>' +
        '<div class="flow-sum"><small>AED</small>' + p.int + '<small>' + p.dec + '</small></div></div>';
    }
    return '<div class="flows">' + flow('flow-in', 'i-in', t('income'), s.in) + flow('flow-out', 'i-out', t('expense'), s.out) + '</div>';
  }

  function renderCategories(list) {
    var by = {};
    list.forEach(function (x) { if (x.type === 'out' && !isFixed(x)) by[x.cat] = (by[x.cat] || 0) + x.amount; });
    var rows = Object.keys(by).map(function (id) { return { cat: catById(id), sum: by[id] }; })
      .sort(function (a, b) { return b.sum - a.sum; });
    if (!rows.length) return '';
    var max = rows[0].sum;
    var total = rows.reduce(function (a, r) { return a + r.sum; }, 0);
    return '<section class="section"><div class="section-head"><h2>' + esc(t('whereMoney')) + '</h2></div>' +
      '<div class="list glass">' + rows.slice(0, 5).map(function (r) {
        var lim = data.budget.cats[r.cat.id];
        var bar = lim
          ? '<div class="bar tone-' + tone(r.sum, lim) + '"><i style="width:' + Math.max(4, Math.min(100, Math.round((r.sum / lim) * 100))) + '%"></i></div>'
          : '<div class="bar" style="--h:' + r.cat.h + '"><i style="width:' + Math.max(4, Math.round((r.sum / max) * 100)) + '%"></i></div>';
        var sub = lim ? t('ofLimit', { x: '', b: money(lim) }).trim() : Math.round((r.sum / total) * 100) + '%';
        return '<button class="row" type="button" data-action="limit" data-key="cat:' + r.cat.id + '">' + catIco(r.cat) +
          '<span class="row-main"><span class="row-title" style="display:block">' + esc(catName(r.cat)) + '</span>' + bar + '</span>' +
          '<span class="row-amount">' + money(r.sum) + '<span class="row-sub" style="display:block;text-align:right">' + esc(sub) + '</span></span></button>';
      }).join('') + '</div></section>';
  }

  function tone(spent, limit) {
    var pct = spent / limit;
    return pct > 1 ? 'over' : pct >= 0.8 ? 'warn' : 'ok';
  }

  function monthSwitch(key) {
    var nowKey = monthKey(new Date());
    return '<header class="topbar">' +
      '<div class="month-switch">' +
      '<button class="icon-btn" type="button" data-action="month" data-delta="-1" aria-label="' + esc(t('prevMonth')) + '">' + icon('i-prev') + '</button>' +
      '<h1>' + esc(monthTitle(key)) + '</h1>' +
      '<button class="icon-btn" type="button" data-action="month" data-delta="1" aria-label="' + esc(t('nextMonth')) + '"' + (key >= nowKey ? ' disabled' : '') + '>' + icon('i-next') + '</button>' +
      '</div>' +
      '<button class="icon-btn glass" type="button" data-action="settings" aria-label="' + esc(t('settings')) + '">' + icon('i-settings') + '</button>' +
      '</header>';
  }

  // Строка бюджета: сколько потрачено из лимита, полоса и метка «сколько прошло времени»
  function limitRow(key, label, spent, limit, timePct, timeLabel) {
    if (!limit) {
      return '<button class="row limit-row" type="button" data-action="limit" data-key="' + key + '">' +
        '<span class="row-main"><span class="row-title" style="display:block">' + esc(label) + '</span>' +
        '<span class="row-sub" style="display:block">' + esc(t('notSet')) + ' · ' + esc(moneyAED(spent)) + '</span></span>' +
        '<span class="link-chip">' + esc(t('setIt')) + '</span></button>';
    }
    var tn = tone(spent, limit);
    var left = limit - spent;
    return '<button class="row limit-row" type="button" data-action="limit" data-key="' + key + '">' +
      '<span class="row-main"><span class="limit-top"><span class="row-title">' + esc(label) + '</span>' +
      '<span class="row-amount">' + esc(t('ofLimit', { x: money(spent), b: money(limit) })) + '</span></span>' +
      '<span class="meter tone-' + tn + '"><i style="width:' + Math.min(100, Math.round((spent / limit) * 100)) + '%"></i>' +
      (timePct != null ? '<b style="left:' + timePct + '%"></b>' : '') + '</span>' +
      '<span class="limit-bottom"><span class="limit-left tone-' + tn + '">' + esc(left >= 0 ? t('leftShort', { x: moneyAED(left) }) : t('overShort', { x: moneyAED(-left) })) + '</span>' +
      (timeLabel ? '<span>' + esc(timeLabel) + '</span>' : '') + '</span></span></button>';
  }

  function renderOverview() {
    var key = ui.month;
    var nowKey = monthKey(new Date());
    var list = txOfMonth(key);
    var year = key.slice(0, 4);
    var yearList = data.tx.filter(function (x) { return x.date.slice(0, 4) === year; });
    var now = new Date();

    var monthTime = key === nowKey ? Math.round((now.getDate() / daysInMonth(key)) * 100) : (key < nowKey ? null : 0);
    var yearTime = null;
    if (+year === now.getFullYear()) {
      var start = new Date(now.getFullYear(), 0, 1), end = new Date(now.getFullYear() + 1, 0, 1);
      yearTime = Math.round(((now - start) / (end - start)) * 100);
    }

    var budgetBlock = '<section class="section"><div class="section-head"><h2>' + esc(t('budgetTitle')) + '</h2></div><div class="list glass">' +
      limitRow('month', t('monthShort'), livingOut(list), data.budget.month, monthTime, null) +
      limitRow('year', t('yearShort', { y: year }), livingOut(yearList), data.budget.year, yearTime, yearTime != null ? t('yearPassed', { p: yearTime }) : null) +
      '</div></section>';

    var by = {};
    list.forEach(function (x) { if (x.type === 'out' && !isFixed(x)) by[x.cat] = (by[x.cat] || 0) + x.amount; });
    var cats = data.categories.filter(function (c) { return c.type === 'out' && c.id !== 'debt'; }).map(function (c) {
      return { cat: c, sum: by[c.id] || 0, lim: data.budget.cats[c.id] || 0 };
    }).sort(function (a, b) {
      if (!!b.lim !== !!a.lim) return b.lim ? 1 : -1;
      return b.sum - a.sum;
    });
    var catBlock = '<section class="section"><div class="section-head"><h2>' + esc(t('catLimits')) + '</h2></div>' +
      '<p class="section-hint">' + esc(t('catHint')) + '</p><div class="list glass">' + cats.map(function (r) {
        var right, bar = '';
        if (r.lim) {
          var tn = tone(r.sum, r.lim);
          right = '<span class="row-amount">' + money(r.sum) + '<span class="row-sub" style="display:block;text-align:right">' + esc(t('ofLimit', { x: '', b: money(r.lim) }).trim()) + '</span></span>';
          bar = '<span class="bar tone-' + tn + '"><i style="width:' + Math.max(3, Math.min(100, Math.round((r.sum / r.lim) * 100))) + '%"></i></span>';
        } else {
          right = '<span class="row-amount' + (r.sum ? '' : ' is-zero') + '">' + money(r.sum) + '<span class="row-sub" style="display:block;text-align:right">' + esc(t('noLimit')) + '</span></span>';
        }
        return '<button class="row" type="button" data-action="limit" data-key="cat:' + r.cat.id + '">' + catIco(r.cat) +
          '<span class="row-main"><span class="row-title" style="display:block">' + esc(catName(r.cat)) + '</span>' + bar + '</span>' + right + '</button>';
      }).join('') + '</div></section>';

    return monthSwitch(key) + '<h2 class="screen-title">' + esc(t('tabOverview')) + '</h2>' + budgetBlock + renderFlowCard(key) + renderCatChart(list) + catBlock;
  }

  /* ----- Графики «Обзора» (правила скилла dataviz: тонкие столбики, одна ось, подписи текстом, не цветом) ----- */
  var CHART_MONTHS = 6;
  function chartWindow(key) {
    var nowKey = monthKey(new Date());
    var end = key > shiftMonth(nowKey, -(CHART_MONTHS - 1)) ? nowKey : key;
    var out = [];
    for (var i = CHART_MONTHS - 1; i >= 0; i--) out.push(shiftMonth(end, -i));
    return out;
  }
  function monthShort(key) {
    return new Intl.DateTimeFormat(locale(), { month: 'short' }).format(parseISO(key + '-01')).replace('.', '');
  }
  function compact(fils) {
    var v = fils / 100;
    if (v >= 1000) return new Intl.NumberFormat(locale(), { maximumFractionDigits: 1 }).format(v / 1000) + 'K';
    return new Intl.NumberFormat(locale()).format(Math.round(v));
  }
  function niceMax(v) {
    if (v <= 0) return 100000;
    var mag = Math.pow(10, Math.floor(Math.log10(v)));
    var steps = [1, 2, 2.5, 5, 10];
    for (var i = 0; i < steps.length; i++) if (steps[i] * mag >= v) return steps[i] * mag;
    return 10 * mag;
  }

  function renderFlowCard(key) {
    var months = chartWindow(key);
    var cur = sums(txOfMonth(key));
    var withData = months.map(function (k) { return sums(txOfMonth(k)); }).filter(function (m) { return m.in || m.out; });
    var avg = withData.length > 1 ? '<p class="chart-note">' + esc(t('avgLine', {
      i: moneyAED(Math.round(withData.reduce(function (a, m) { return a + m.in; }, 0) / withData.length)),
      o: moneyAED(Math.round(withData.reduce(function (a, m) { return a + m.out; }, 0) / withData.length))
    })) + '</p>' : '';
    var netV = cur.in - cur.out;
    return '<section class="section"><div class="section-head"><h2>' + esc(t('flowTitle')) + '</h2></div>' +
      '<div class="chart-card glass">' +
      '<div class="legend"><span><i class="sw sw-in"></i>' + esc(t('income')) + '</span><span><i class="sw sw-out"></i>' + esc(t('expense')) + '</span></div>' +
      '<div class="flow-chart" id="flow-chart" role="img" aria-label="' + esc(t('chartLabel', { n: CHART_MONTHS })) + '"></div>' +
      '<div class="readout"><p class="readout-month">' + esc(monthTitle(key)) + '</p>' +
      '<div class="readout-row"><span><i class="lk lk-in"></i>' + esc(t('income')) + '</span><strong>' + esc(moneyAED(cur.in)) + '</strong></div>' +
      '<div class="readout-row"><span><i class="lk lk-out"></i>' + esc(t('expense')) + '</span><strong>' + esc(moneyAED(cur.out)) + '</strong></div>' +
      '<div class="readout-row is-net"><span>' + esc(t('net')) + '</span><strong class="' + (netV < 0 ? 'is-neg' : 'is-pos') + '">' + (netV > 0 ? '+' : '') + esc(moneyAED(netV)) + '</strong></div></div>' +
      avg + '</div><p class="section-hint" style="margin-top:8px">' + esc(t('flowHint')) + '</p></section>';
  }

  // Рисуем после вставки в страницу: нужна настоящая ширина контейнера
  function drawFlowChart() {
    var box = document.getElementById('flow-chart');
    if (!box) return;
    var months = chartWindow(ui.month);
    var vals = months.map(function (k) { var x = sums(txOfMonth(k)); return { key: k, in: x.in, out: x.out }; });
    var W = Math.max(260, box.clientWidth), H = 176;
    var padL = 34, padR = 4, padT = 10, padB = 24;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var max = niceMax(Math.max.apply(null, vals.map(function (v) { return Math.max(v.in, v.out); })));
    var y = function (v) { return padT + plotH - (v / max) * plotH; };
    var slot = plotW / vals.length;
    var bw = Math.min(14, (slot - 14) / 2);
    var svg = '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">';
    [0, 0.5, 1].forEach(function (f) {
      var yy = Math.round(y(max * f)) + 0.5;
      svg += '<line class="grid" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + yy + '" y2="' + yy + '"/>' +
        '<text class="tick" x="' + (padL - 6) + '" y="' + (yy + 4) + '" text-anchor="end">' + esc(compact(max * f)) + '</text>';
    });
    var bar = function (x, v, cls) {
      if (!v) return '';
      var top = y(v), base = padT + plotH, h = base - top, r = Math.min(4, h, bw / 2);
      return '<path class="' + cls + '" d="M' + x + ',' + base + 'V' + (top + r) + 'Q' + x + ',' + top + ' ' + (x + r) + ',' + top +
        'H' + (x + bw - r) + 'Q' + (x + bw) + ',' + top + ' ' + (x + bw) + ',' + (top + r) + 'V' + base + 'Z"/>';
    };
    vals.forEach(function (v, i) {
      var cx = padL + slot * i + slot / 2;
      var sel = v.key === ui.month;
      var label = monthTitle(v.key) + ': ' + t('income') + ' ' + moneyAED(v.in) + ', ' + t('expense') + ' ' + moneyAED(v.out);
      svg += '<g class="bar-g' + (sel ? ' is-sel' : '') + '" data-action="month-pick" data-month="' + v.key + '">' +
        '<title>' + esc(label) + '</title>' +
        '<rect class="hit" x="' + (padL + slot * i + 2) + '" y="0" width="' + (slot - 4) + '" height="' + H + '" rx="10"/>' +
        bar(cx - bw - 1, v.in, 'b-in') + bar(cx + 1, v.out, 'b-out') +
        '<text class="mlabel" x="' + cx + '" y="' + (H - 6) + '" text-anchor="middle">' + esc(monthShort(v.key)) + '</text></g>';
    });
    box.innerHTML = svg + '</svg>';
  }

  function renderCatChart(list) {
    var by = {};
    list.forEach(function (x) { if (x.type === 'out' && !isFixed(x)) by[x.cat] = (by[x.cat] || 0) + x.amount; });
    var rows = Object.keys(by).map(function (id) { return { name: catName(catById(id)), sum: by[id] }; })
      .sort(function (a, b) { return b.sum - a.sum; });
    if (!rows.length) return '';
    var total = rows.reduce(function (a, r) { return a + r.sum; }, 0);
    if (rows.length > 6) {
      var rest = rows.slice(5).reduce(function (a, r) { return a + r.sum; }, 0);
      rows = rows.slice(0, 5).concat([{ name: t('otherCats'), sum: rest, other: true }]);
    }
    var max = Math.max.apply(null, rows.map(function (r) { return r.sum; }));
    return '<section class="section"><div class="section-head"><h2>' + esc(t('byCat')) + '</h2></div>' +
      '<p class="section-hint">' + esc(t('byCatHint')) + '</p><div class="chart-card glass rank">' + rows.map(function (r) {
        var share = Math.round((r.sum / total) * 100);
        var label = r.name + ' · ' + moneyAED(r.sum) + ' · ' + share + '%';
        return '<div class="rank-row" tabindex="0" title="' + esc(label) + '" aria-label="' + esc(label) + '">' +
          '<span class="rank-name">' + esc(r.name) + '</span>' +
          '<span class="rank-bar"><i class="' + (r.other ? 'is-other' : '') + '" style="--p:' + Math.max(0.015, r.sum / max).toFixed(4) + '"></i>' +
          '<b>' + money(r.sum) + ' <small>' + share + '%</small></b></span></div>';
      }).join('') + '</div></section>';
  }

  /* ----- Лист лимита: месяц, год или категория ----- */
  var limitKey = null;
  function limitValue(k) {
    if (k === 'save-month') return data.savings.month;
    if (k === 'save-year') return data.savings.year;
    if (k === 'month') return data.budget.month;
    if (k === 'year') return data.budget.year;
    return data.budget.cats[k.slice(4)] || null;
  }
  function renderLimit() {
    var k = limitKey;
    var title = k === 'save-month' ? t('saveMonthTitle') : k === 'save-year' ? t('saveYearTitle') : k === 'month' ? t('monthBudget') : k === 'year' ? t('yearBudget') : t('catLimit', { c: catName(catById(k.slice(4))) });
    var hint = k.indexOf('save-') === 0 ? t('saveHint') : k === 'month' ? t('budgetNote') : k === 'year' ? t('yearHint') : t('limitHint');
    var v = limitValue(k);
    return '<div class="sheet-head"><h2>' + esc(title) + '</h2>' +
      '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="' + esc(t('close')) + '">' + icon('i-close') + '</button></div>' +
      '<div class="field"><div class="input-wrap"><span>AED</span><input id="limit-input" inputmode="decimal" autocomplete="off" placeholder="' + esc(t('notSet')) + '" value="' +
      (v ? esc(money(v).replace(/[\s\u00a0\u202f]/g, ' ')) : '') + '" enterkeyhint="done" data-autofocus></div>' +
      '<p class="version" style="text-align:left;margin:8px 4px 0;font-size:13.5px">' + esc(hint) + '</p></div>' +
      '<div class="sheet-actions">' + (v ? '<button class="btn btn-danger" type="button" data-action="limit-remove">' + esc(t('removeLimit')) + '</button>' : '') +
      '<button class="btn btn-primary" type="button" data-action="limit-save">' + esc(t('save')) + '</button></div>';
  }
  function setLimit(k, v) {
    if (k === 'save-month') data.savings.month = v;
    else if (k === 'save-year') data.savings.year = v;
    else if (k === 'month') data.budget.month = v;
    else if (k === 'year') data.budget.year = v;
    else if (v) data.budget.cats[k.slice(4)] = v;
    else delete data.budget.cats[k.slice(4)];
  }
  function saveLimit(remove) {
    var input = document.getElementById('limit-input');
    var raw = remove ? '' : (input ? input.value.trim() : '');
    var v = null;
    if (raw) {
      v = parseMoney(raw);
      if (!v) { input.focus(); input.select(); return; }
    }
    setLimit(limitKey, v);
    persist();
    if (limitKey === 'month') ui.intro = true;
    closeSheet();
    render();
    toast(v ? t('limitSaved') : t('limitRemoved'));
  }

  function renderFixed(list) {
    var items = payables();
    var paidCount = 0;
    var rows = items.map(function (p) {
      var paid = paidFor(p.id, list);
      var done = paid >= p.amount;
      if (done) paidCount++;
      var status = done ? '<span class="fixed-status is-paid">' + icon('i-check') + esc(t('paid')) + '</span>'
        : '<span class="fixed-status">' + esc(paid ? t('partPaid', { x: money(paid) }) : t('notPaid')) + '</span>';
      var inner = '<span class="cat-ico" style="--h:' + p.h + '">' + icon('c-' + p.icon) + '</span>' +
        '<span class="row-main"><span class="row-title" style="display:block">' + esc(p.name) + '</span>' + status + '</span>' +
        '<span class="row-amount">' + money(p.amount) + '</span>';
      return done ? '<div class="row is-done">' + inner + '</div>'
        : '<button class="row" type="button" data-action="pay" data-id="' + p.id + '">' + inner + '</button>';
    }).join('');
    var addRow = '<button class="row row-add" type="button" data-action="obl-new"><span class="cat-ico add-ico">' + icon('i-plus') + '</span><span class="row-main row-title">' + esc(t('addObl')) + '</span></button>';
    return '<section class="section"><div class="section-head"><h2>' + esc(t('mustPay')) + '</h2>' +
      (items.length ? '<span>' + esc(t('paidOf', { a: paidCount, b: items.length })) + '</span>' : '') + '</div>' +
      '<div class="list glass">' + rows + addRow + '</div>' +
      (data.obligations.length ? '<button class="link-btn" type="button" data-action="obl-manage">' + esc(t('manage')) + '</button>' : '') +
      '</section>';
  }

  function renderOps(list, isCurrent) {
    var head = '<div class="section-head"><h2>' + esc(t('operations')) + '</h2>' + (list.length ? '<span>' + list.length + '</span>' : '') + '</div>';
    if (!list.length) {
      return '<section class="section">' + head + '<div class="empty glass">' + esc(isCurrent ? t('emptyOps') : t('emptyOpsPast')) + '</div></section>';
    }
    var sorted = list.slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : b.created - a.created; });
    var groups = [];
    sorted.forEach(function (x) {
      var g = groups[groups.length - 1];
      if (!g || g.date !== x.date) groups.push(g = { date: x.date, items: [] });
      g.items.push(x);
    });
    return '<section class="section">' + head + groups.map(function (g) {
      return '<p class="day-label">' + esc(dayTitle(g.date)) + '</p><div class="list glass">' + g.items.map(function (x) {
        if (x.type === 'save') {
          var gl = goalById(x.goalId);
          return '<button class="row" type="button" data-action="goal" data-id="' + x.goalId + '">' + goalIco(gl) +
            '<span class="row-main"><span class="row-title" style="display:block">' + esc(gl ? gl.name : '—') + '</span>' +
            '<span class="row-sub" style="display:block">' + esc((x.amount > 0 ? t('toGoal') : t('fromGoal')) + (x.note ? ' · ' + x.note : '')) + '</span></span>' +
            '<span class="row-amount is-save">' + (x.amount > 0 ? '+' : '−') + money(Math.abs(x.amount)) + '</span></button>';
        }
        var c = catById(x.cat);
        var sub = x.note || '';
        var title = catName(c);
        var pt = payTarget(x) && payableById(payTarget(x));
        if (pt) { title = pt.name; sub = catName(c) + (sub ? ' · ' + sub : ''); }
        return '<button class="row" type="button" data-action="edit" data-id="' + x.id + '">' + catIco(c) +
          '<span class="row-main"><span class="row-title" style="display:block">' + esc(title) + '</span>' +
          (sub ? '<span class="row-sub" style="display:block">' + esc(sub) + '</span>' : '') + '</span>' +
          '<span class="row-amount' + (x.type === 'in' ? ' is-in' : '') + '">' + (x.type === 'in' ? '+' : '−') + money(x.amount) + '</span></button>';
      }).join('') + '</div>';
    }).join('') + '</section>';
  }

  /* ---------- Цели и накопления ---------- */
  var GOAL_HUES = [205, 160, 290, 55, 330, 120, 20, 250];
  function goalById(id) { return data.goals.filter(function (g) { return g.id === id; })[0] || null; }
  function goalIco(g) { return '<span class="cat-ico" style="--h:' + (g ? g.h : 245) + '">' + icon('i-goals') + '</span>'; }
  function goalSaved(g) {
    return (g.start || 0) + data.tx.reduce(function (a, x) { return a + (x.type === 'save' && x.goalId === g.id ? x.amount : 0); }, 0);
  }
  function savedIn(prefix) {
    return data.tx.reduce(function (a, x) { return a + (x.type === 'save' && x.date.indexOf(prefix) === 0 ? x.amount : 0); }, 0);
  }
  // Срок цели — последний день месяца: «30 июня 2027», «30 Jun 2027»
  function monthLong(key) {
    var d = parseISO(key + '-' + pad(daysInMonth(key)));
    return new Intl.DateTimeFormat(locale(), { day: 'numeric', month: data.lang === 'ru' ? 'long' : 'short', year: 'numeric' }).format(d).replace(/\s?г\.$/, '');
  }

  function renderSavedStrip(s) {
    if (!data.goals.length && !data.savings.month) return '';
    var target = data.savings.month;
    var pct = target ? Math.min(100, Math.round((Math.max(0, s.save) / target) * 100)) : null;
    return '<button class="saved-strip glass" type="button" data-action="tab" data-tab="goals">' +
      '<span class="saved-ico">' + icon('i-goals') + '</span>' +
      '<span class="row-main"><span class="row-sub" style="display:block">' + esc(t('savedMonth')) + '</span>' +
      '<span class="row-title" style="display:block">AED ' + money(s.save) + (target ? ' <small>/ ' + money(target) + '</small>' : '') + '</span></span>' +
      (pct != null ? '<span class="pct-pill' + (pct >= 100 ? ' is-done' : '') + '">' + pct + '%</span>' : '') + icon('i-next', 'chev') + '</button>';
  }

  function saveRow(key, label, saved, target, timePct) {
    if (!target) {
      return '<button class="row limit-row" type="button" data-action="limit" data-key="' + key + '">' +
        '<span class="row-main"><span class="row-title" style="display:block">' + esc(label) + '</span>' +
        '<span class="row-sub" style="display:block">' + esc(t('notSet')) + ' · ' + esc(moneyAED(saved)) + '</span></span>' +
        '<span class="link-chip">' + esc(t('setIt')) + '</span></button>';
    }
    var pct = Math.round((Math.max(0, saved) / target) * 100);
    var done = saved >= target;
    return '<button class="row limit-row" type="button" data-action="limit" data-key="' + key + '">' +
      '<span class="row-main"><span class="limit-top"><span class="row-title">' + esc(label) + '</span>' +
      '<span class="pct-pill' + (done ? ' is-done' : '') + '">' + pct + '%</span></span>' +
      '<span class="meter is-save' + (done ? ' is-done' : '') + '"><i style="width:' + Math.min(100, pct) + '%"></i>' +
      (timePct != null ? '<b style="left:' + timePct + '%"></b>' : '') + '</span>' +
      '<span class="limit-bottom"><span>' + esc(t('savedOf', { x: money(saved), b: money(target) })) + '</span>' +
      '<span class="limit-left' + (done ? ' tone-ok' : '') + '" style="' + (done ? '' : 'color:var(--accent)') + '">' + esc(done ? t('planDone') : t('saveLeft', { x: money(target - saved) })) + '</span></span></span></button>';
  }

  function goalCard(g) {
    var saved = goalSaved(g);
    var pct = g.target ? Math.round((Math.max(0, saved) / g.target) * 100) : 0;
    var done = saved >= g.target;
    var foot = '';
    if (done) foot = '<span class="goal-foot is-done">' + icon('i-check') + esc(t('goalDone')) + '</span>';
    else if (g.due) {
      var nowKey = monthKey(new Date());
      if (g.due < nowKey) foot = '<span class="goal-foot is-late">' + esc(t('dueMissed', { d: monthLong(g.due) })) + '</span>';
      else {
        var a = parseISO(nowKey + '-01'), b = parseISO(g.due + '-01');
        var months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
        foot = '<span class="goal-foot">' + esc(t('perMonthNeed', { x: moneyAED(Math.ceil((g.target - saved) / months / 100) * 100), d: monthLong(g.due) })) + '</span>';
      }
    }
    return '<button class="goal glass" type="button" data-action="goal" data-id="' + g.id + '" style="--h:' + g.h + '">' +
      '<span class="goal-top">' + goalIco(g) + '<span class="row-main"><span class="row-title" style="display:block">' + esc(g.name) + '</span>' +
      '<span class="row-sub" style="display:block">' + esc(t('goalOf', { x: moneyAED(saved), b: money(g.target) })) + '</span></span>' +
      '<span class="pct-pill' + (done ? ' is-done' : '') + '">' + Math.min(pct, 999) + '%</span></span>' +
      '<span class="meter is-goal' + (done ? ' is-done' : '') + '"><i style="width:' + Math.min(100, pct) + '%"></i></span>' + foot + '</button>';
  }

  function renderGoals() {
    var now = new Date();
    var nowKey = monthKey(now);
    var year = String(now.getFullYear());
    var start = new Date(now.getFullYear(), 0, 1), end = new Date(now.getFullYear() + 1, 0, 1);
    var yearTime = Math.round(((now - start) / (end - start)) * 100);
    var monthTime = Math.round((now.getDate() / daysInMonth(nowKey)) * 100);
    var plan = '<section class="section"><div class="section-head"><h2>' + esc(t('savePlan')) + '</h2></div><div class="list glass">' +
      saveRow('save-month', monthTitle(nowKey), savedIn(nowKey), data.savings.month, monthTime) +
      saveRow('save-year', t('yearShort', { y: year }), savedIn(year), data.savings.year, yearTime) + '</div></section>';
    var goals = data.goals.slice().sort(function (a, b) {
      var ad = goalSaved(a) >= a.target, bd = goalSaved(b) >= b.target;
      return ad === bd ? 0 : ad ? 1 : -1;
    });
    var piggies = '<section class="section"><div class="section-head"><h2>' + esc(t('piggies')) + '</h2>' + (goals.length ? '<span>' + goals.length + '</span>' : '') + '</div>' +
      (goals.length ? '<div class="goals">' + goals.map(goalCard).join('') + '</div>' : '<div class="empty glass">' + esc(t('noGoalsYet')) + '</div>') +
      '<button class="btn btn-quiet btn-block new-goal" type="button" data-action="goal-new">' + icon('i-plus') + esc(t('newGoal')) + '</button></section>';
    return '<header class="topbar"><h1 class="page-title">' + esc(t('tabGoals')) + '</h1>' +
      '<button class="icon-btn glass" type="button" data-action="settings" aria-label="' + esc(t('settings')) + '">' + icon('i-settings') + '</button></header>' +
      plan + piggies;
  }

  /* ----- Лист копилки: просмотр, пополнение, правка ----- */
  var goalUI = { id: null, mode: 'view' };
  function renderGoalSheet() {
    var g = goalById(goalUI.id);
    var head = function (title) {
      return '<div class="sheet-head"><h2>' + esc(title) + '</h2>' +
        '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="' + esc(t('close')) + '">' + icon('i-close') + '</button></div>';
    };
    if (goalUI.mode !== 'view' || !g) {
      var isNew = !g;
      return head(isNew ? t('newGoal') : g.name) +
        '<div class="field"><label class="field-label" for="goal-name">' + esc(t('goalName')) + '</label>' +
        '<div class="input-wrap"><input id="goal-name" maxlength="40" autocomplete="off" placeholder="' + esc(t('goalNamePh')) + '" value="' + esc(g ? g.name : '') + '"' + (isNew ? ' data-autofocus' : '') + '></div></div>' +
        '<div class="field"><label class="field-label" for="goal-target">' + esc(t('goalTarget')) + '</label>' +
        '<div class="input-wrap"><span>AED</span><input id="goal-target" inputmode="decimal" autocomplete="off" placeholder="0" value="' + (g ? esc(String(g.target / 100)) : '') + '"></div></div>' +
        (isNew ? '<div class="field"><label class="field-label" for="goal-start">' + esc(t('goalStart')) + '</label>' +
          '<div class="input-wrap"><span>AED</span><input id="goal-start" inputmode="decimal" autocomplete="off" placeholder="0"></div></div>' : '') +
        '<div class="field"><label class="field-label" for="goal-due">' + esc(t('goalDue')) + '</label>' +
        '<div class="input-wrap"><input id="goal-due" type="month" min="' + monthKey(new Date()) + '" value="' + esc(g && g.due ? g.due : '') + '"></div></div>' +
        '<div class="sheet-actions">' + (isNew ? '' : '<button class="btn btn-ghost" type="button" data-action="goal-view">' + esc(t('close')) + '</button>') +
        '<button class="btn btn-primary" type="button" data-action="goal-save">' + esc(isNew ? t('create') : t('save')) + '</button></div>';
    }
    var saved = goalSaved(g);
    var pct = Math.round((Math.max(0, saved) / g.target) * 100);
    var moves = data.tx.filter(function (x) { return x.type === 'save' && x.goalId === g.id; })
      .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : b.created - a.created; }).slice(0, 6);
    return head(g.name) +
      '<div class="goal-hero" style="--h:' + g.h + '"><div class="budget-amount">' + bigMoney(saved) + '</div>' +
      '<p class="row-sub">' + esc(t('goalOf', { x: '', b: moneyAED(g.target) }).trim()) + (g.due ? ' · ' + esc(t('dueBy', { d: monthLong(g.due) })) : '') + '</p>' +
      '<span class="meter is-goal' + (saved >= g.target ? ' is-done' : '') + '"><i style="width:' + Math.min(100, pct) + '%"></i></span>' +
      '<p class="goal-pct">' + pct + '%</p></div>' +
      '<div class="field"><div class="input-wrap"><span>AED</span><input id="goal-amount" inputmode="decimal" autocomplete="off" placeholder="' + esc(t('amount')) + '" data-autofocus enterkeyhint="done"></div></div>' +
      '<div class="goal-actions"><button class="btn btn-quiet" type="button" data-action="goal-move" data-dir="-1">' + esc(t('withdraw')) + '</button>' +
      '<button class="btn btn-primary" type="button" data-action="goal-move" data-dir="1">' + icon('i-plus') + esc(t('topUp')) + '</button></div>' +
      (moves.length ? '<p class="field-label" style="margin-top:20px">' + esc(t('history')) + '</p><div class="list obl-list">' + moves.map(function (x) {
        return '<div class="row obl-row"><span class="row-main"><span class="row-title" style="display:block">' + (x.amount > 0 ? '+' : '−') + money(Math.abs(x.amount)) + '</span>' +
          '<span class="row-sub" style="display:block">' + esc(dayTitle(x.date)) + '</span></span>' +
          '<button class="icon-btn" type="button" data-action="move-delete" data-id="' + x.id + '" aria-label="' + esc(t('del')) + '">' + icon('i-trash') + '</button></div>';
      }).join('') + '</div>' : '') +
      '<div class="sheet-actions"><button class="btn btn-danger" type="button" data-action="goal-delete">' + icon('i-trash') + esc(t('deleteGoal')) + '</button>' +
      '<button class="btn btn-quiet" type="button" data-action="goal-edit">' + esc(t('editGoal')) + '</button></div>';
  }

  function saveGoal() {
    var name = (document.getElementById('goal-name').value || '').trim();
    var target = parseMoney(document.getElementById('goal-target').value);
    var due = (document.getElementById('goal-due').value || '').slice(0, 7) || null;
    if (!name || !target) { toast(t('needGoalFields')); return; }
    var g = goalById(goalUI.id);
    if (g) { g.name = name; g.target = target; g.due = due; }
    else {
      var startEl = document.getElementById('goal-start');
      g = { id: 'g' + uid(), name: name, target: target, due: due, start: parseMoney(startEl && startEl.value) || 0, h: GOAL_HUES[data.goals.length % GOAL_HUES.length], created: Date.now() };
      data.goals.push(g);
      goalUI.id = g.id;
    }
    persist();
    goalUI.mode = 'view';
    render(); drawSheet();
    toast(t('goalSaved'));
  }

  function moveGoal(dir) {
    var g = goalById(goalUI.id);
    var input = document.getElementById('goal-amount');
    var v = parseMoney(input && input.value);
    if (!g || !v) { if (input) input.focus(); return; }
    if (dir < 0 && v > goalSaved(g)) { toast(t('notEnough', { x: moneyAED(Math.max(0, goalSaved(g))) })); return; }
    var x = { id: uid(), type: 'save', cat: 'save', goalId: g.id, amount: dir * v, date: isoDate(new Date()), note: '', created: Date.now() };
    data.tx.push(x);
    persist(); render(); drawSheet();
    toast((dir > 0 ? t('moved', { g: g.name, x: '+' + money(v) }) : t('movedOut', { g: g.name, x: '−' + money(v) })), function () {
      removeTx(x.id); if (ui.sheet === 'goal') drawSheet();
    });
  }

  /* ---------- Долги ---------- */
  // Сколько месяцев до закрытия при текущем платеже (аннуитет)
  function debtMonths(d) {
    if (d.balance <= 0) return 0;
    if (!d.payment) return Infinity;
    var r = (d.rate || 0) / 100 / 12;
    if (!r) return Math.ceil(d.balance / d.payment);
    if (d.payment <= d.balance * r) return Infinity;
    return Math.ceil(-Math.log(1 - (r * d.balance) / d.payment) / Math.log(1 + r));
  }
  function addMonths(n) { var d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + n); return monthKey(d); }
  function monthYear(key) {
    return cap(new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(parseISO(key + '-01')).replace(/\s?г\.$/, ''));
  }
  function rateStr(r) { return new Intl.NumberFormat(locale(), { maximumFractionDigits: 2 }).format(r || 0) + '%'; }
  function isMortgage(d) { return d.key === 'mortgage' || /ипотек|mortgage/i.test(d.name || ''); }
  function debtById(id) { return data.debts.filter(function (d) { return d.id === id; })[0] || null; }

  function renderDebts() {
    var nowKey = monthKey(new Date());
    var month = txOfMonth(nowKey);
    var total = 0, perMonth = 0, last = 0, endless = false;
    data.debts.forEach(function (d) {
      total += d.balance;
      if (d.balance > 0) { perMonth += d.payment; var m = debtMonths(d); if (m === Infinity) endless = true; else last = Math.max(last, m); }
    });
    var head = '<header class="topbar"><h1 class="page-title">' + esc(t('tabDebts')) + '</h1>' +
      '<button class="icon-btn glass" type="button" data-action="settings" aria-label="' + esc(t('settings')) + '">' + icon('i-settings') + '</button></header>';
    var summary = '<section class="budget glass debt-sum"><p class="budget-label">' + esc(t('debtLeftTotal')) + '</p>' +
      '<div class="budget-amount">' + bigMoney(total) + '</div>' +
      '<div class="debt-stats"><div><span>' + esc(t('perMonth')) + '</span><strong>AED ' + money(perMonth) + '</strong></div>' +
      '<div><span>' + esc(t('debtFree')) + '</span><strong>' + (total <= 0 ? '✓' : endless ? '—' : esc(monthYear(addMonths(last)))) + '</strong></div></div></section>';
    var cards = data.debts.slice().sort(function (a, b) { return (a.balance <= 0) - (b.balance <= 0); }).map(function (d) {
      var orig = Math.max(d.original || d.balance, d.balance);
      var pct = orig ? Math.round(((orig - d.balance) / orig) * 100) : 0;
      var m = debtMonths(d);
      var closed = d.balance <= 0;
      var paid = paidFor(d.id, month) >= d.payment;
      var foot = closed ? '<span class="goal-foot is-done">' + icon('i-check') + esc(t('debtClosed')) + '</span>'
        : m === Infinity ? '<span class="goal-foot is-late">' + esc(t('noCover')) + '</span>'
        : '<span class="goal-foot">' + esc(t('payment')) + ' ' + money(d.payment) + ' · ' + esc(t('monthsN', { n: m })) + ' · ' + esc(monthYear(addMonths(m))) + '</span>';
      return '<button class="goal glass debt" type="button" data-action="debt" data-id="' + d.id + '" style="--h:250">' +
        '<span class="goal-top"><span class="cat-ico" style="--h:250">' + icon(isMortgage(d) ? 'c-house' : 'c-bank') + '</span>' +
        '<span class="row-main"><span class="row-title" style="display:block">' + esc(debtName(d)) + '</span>' +
        (closed ? '' : '<span class="fixed-status' + (paid ? ' is-paid' : '') + '">' + (paid ? icon('i-check') : '') + esc(paid ? t('paid') : t('notPaid')) + '</span>') + '</span>' +
        '<span class="pct-pill">' + esc(rateStr(d.rate)) + '</span></span>' +
        '<span class="debt-balance">AED ' + money(d.balance) + '</span>' +
        '<span class="row-sub" style="display:block">' + esc(t('debtOf', { b: money(orig), p: pct })) + '</span>' +
        '<span class="meter is-done"><i style="width:' + Math.max(closed ? 100 : 2, pct) + '%"></i></span>' + foot + '</button>';
    }).join('');
    return head + (data.debts.length ? summary : '') + '<section class="section"><div class="section-head"><h2>' + esc(t('loans')) + '</h2>' + (data.debts.length ? '<span>' + data.debts.length + '</span>' : '') + '</div>' +
      (cards ? '<div class="goals">' + cards + '</div>' : '<div class="empty glass">' + esc(t('noDebts')) + '</div>') +
      '<button class="btn btn-quiet btn-block new-goal" type="button" data-action="debt-new">' + icon('i-plus') + esc(t('addDebt')) + '</button></section>';
  }

  var debtUI = { id: null, mode: 'view' };
  function moneyInput(v) { return v ? esc(String(v / 100)) : ''; }
  function renderDebtSheet() {
    var d = debtById(debtUI.id);
    var head = function (title) {
      return '<div class="sheet-head"><h2>' + esc(title) + '</h2>' +
        '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="' + esc(t('close')) + '">' + icon('i-close') + '</button></div>';
    };
    if (debtUI.mode !== 'view' || !d) {
      var isNew = !d;
      var f = function (id, label, val, extra) {
        return '<div class="field"><label class="field-label" for="' + id + '">' + esc(label) + '</label><div class="input-wrap">' + (extra || '') +
          '<input id="' + id + '" ' + (id === 'debt-name' ? 'maxlength="40"' : 'inputmode="decimal"') + ' autocomplete="off" value="' + val + '"' +
          (id === 'debt-name' ? ' placeholder="' + esc(t('debtNamePh')) + '"' + (isNew ? ' data-autofocus' : '') : ' placeholder="0"') + '></div></div>';
      };
      return head(isNew ? t('addDebt') : debtName(d)) +
        f('debt-name', t('debtName'), esc(d ? debtName(d) : '')) +
        f('debt-balance', t('debtBalance'), moneyInput(d && d.balance), '<span>AED</span>') +
        f('debt-payment', t('debtPayment'), moneyInput(d && d.payment), '<span>AED</span>') +
        f('debt-rate', t('debtRate'), d ? esc(String(d.rate || '')).replace('.', data.lang === 'ru' ? ',' : '.') : '', '<span>%</span>') +
        f('debt-original', t('debtOriginal'), moneyInput(d && d.original), '<span>AED</span>') +
        '<p class="version" style="text-align:left;margin:-4px 4px 16px;font-size:13.5px">' + esc(t('debtHint')) + '</p>' +
        '<div class="sheet-actions">' + (isNew ? '' : '<button class="btn btn-ghost" type="button" data-action="debt-view">' + esc(t('close')) + '</button>') +
        '<button class="btn btn-primary" type="button" data-action="debt-save">' + esc(isNew ? t('add') : t('save')) + '</button></div>';
    }
    var orig = Math.max(d.original || d.balance, d.balance);
    var pct = orig ? Math.round(((orig - d.balance) / orig) * 100) : 0;
    var m = debtMonths(d);
    var paid = paidFor(d.id, txOfMonth(monthKey(new Date()))) >= d.payment;
    var interest = m === Infinity || !m ? null : Math.max(0, m * d.payment - d.balance);
    var fact = function (label, val, cls) { return '<div class="row"><span class="row-main row-sub" style="font-size:15px">' + esc(label) + '</span><span class="row-amount' + (cls ? ' ' + cls : '') + '">' + esc(val) + '</span></div>'; };
    return head(debtName(d)) +
      '<div class="goal-hero"><div class="budget-amount">' + bigMoney(d.balance) + '</div>' +
      '<p class="row-sub">' + esc(t('debtOf', { b: moneyAED(orig), p: pct })) + '</p>' +
      '<span class="meter is-done"><i style="width:' + Math.max(2, pct) + '%"></i></span></div>' +
      '<div class="list obl-list">' +
      fact(t('payment'), 'AED ' + money(d.payment)) +
      fact(t('rate'), rateStr(d.rate)) +
      (d.balance > 0 ? fact(t('monthsLeft'), m === Infinity ? t('noCover') : t('monthsN', { n: m }), m === Infinity ? 'tone-warn' : '') : '') +
      (d.balance > 0 && m !== Infinity ? fact(t('closeBy'), monthYear(addMonths(m))) : '') +
      (interest != null ? fact(t('interestAhead'), '≈ AED ' + money(Math.round(interest / 100) * 100)) : '') +
      '</div>' +
      (d.balance > 0 && !paid ? '<button class="btn btn-primary btn-block" type="button" data-action="pay" data-id="' + d.id + '" style="margin-top:4px">' + icon('i-check') + esc(t('payNow')) + '</button>' : '') +
      '<div class="sheet-actions"><button class="btn btn-danger" type="button" data-action="debt-delete">' + icon('i-trash') + esc(t('deleteDebt')) + '</button>' +
      '<button class="btn btn-quiet" type="button" data-action="debt-edit">' + esc(t('editGoal')) + '</button></div>';
  }

  function saveDebt() {
    var val = function (id) { return (document.getElementById(id).value || '').trim(); };
    var name = val('debt-name');
    var balance = parseMoney(val('debt-balance'));
    var payment = parseMoney(val('debt-payment'));
    var original = parseMoney(val('debt-original'));
    var rate = parseFloat(val('debt-rate').replace(',', '.')) || 0;
    if (!name || balance == null || !payment) { toast(t('needDebtFields')); return; }
    var d = debtById(debtUI.id);
    if (!d) {
      d = { id: 'd' + uid(), key: null };
      data.debts.push(d);
      debtUI.id = d.id;
    }
    if (!d.key || name !== t('debt.' + d.key)) d.name = name;
    d.balance = balance; d.payment = payment; d.rate = rate;
    d.original = Math.max(original || 0, balance);
    persist();
    debtUI.mode = 'view';
    render(); drawSheet();
    toast(t('debtSaved'));
  }

  /* ---------- Первый запуск ---------- */
  function renderWelcome() {
    var mark = '<div class="welcome-mark glass">' + icon('i-plane') + '</div>';
    if (ui.welcomeStep === 0) {
      return '<div class="welcome">' + mark +
        '<h1>' + esc(t('helloTitle')) + '</h1><p>' + esc(t('helloText')) + '</p>' +
        '<div class="welcome-card glass"><span class="field-label">' + esc(t('language')) + '</span>' + langSeg() + '</div>' +
        '<button class="btn btn-primary btn-block" type="button" data-action="welcome-next">' + esc(t('next')) + '</button></div>';
    }
    return '<div class="welcome">' + mark +
      '<h1>' + esc(t('budgetQ')) + '</h1><p>' + esc(t('budgetQHint')) + '</p>' +
      '<div class="welcome-card glass"><label class="input-wrap"><span>AED</span>' +
      '<input id="welcome-budget" inputmode="decimal" autocomplete="off" placeholder="10 000" aria-label="' + esc(t('monthBudget')) + '"></label></div>' +
      '<button class="btn btn-primary btn-block" type="button" data-action="welcome-done">' + esc(t('start')) + '</button>' +
      '<button class="btn btn-ghost" type="button" data-action="welcome-skip">' + esc(t('skip')) + '</button></div>';
  }

  function langSeg() {
    return '<div class="seg" role="radiogroup" aria-label="' + esc(t('language')) + '">' +
      '<button type="button" role="radio" data-action="lang" data-lang="ru" aria-checked="' + (data.lang === 'ru') + '">Русский</button>' +
      '<button type="button" role="radio" data-action="lang" data-lang="en" aria-checked="' + (data.lang === 'en') + '">English</button></div>';
  }

  /* ---------- Нижние панели ---------- */
  var layer = document.getElementById('sheet-layer');
  var sheetEl = document.getElementById('sheet');
  var lastFocus = null;

  function openSheet(kind) {
    ui.sheet = kind;
    lastFocus = document.activeElement;
    drawSheet();
    layer.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { layer.classList.add('is-open'); }); });
    document.body.style.overflow = 'hidden';
    var first = sheetEl.querySelector('[data-autofocus]') || sheetEl.querySelector('button');
    if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 50);
  }
  function closeSheet() {
    if (!ui.sheet) return;
    ui.sheet = null;
    layer.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { if (!ui.sheet) { layer.hidden = true; sheetEl.innerHTML = ''; } }, 420);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function drawSheet() {
    if (ui.sheet === 'add') sheetEl.innerHTML = renderAddSheet();
    else if (ui.sheet === 'settings') sheetEl.innerHTML = renderSettings();
    else if (ui.sheet === 'obl') sheetEl.innerHTML = renderObl();
    else if (ui.sheet === 'limit') sheetEl.innerHTML = renderLimit();
    else if (ui.sheet === 'goal') sheetEl.innerHTML = renderGoalSheet();
    else if (ui.sheet === 'debt') sheetEl.innerHTML = renderDebtSheet();
    sheetEl.setAttribute('aria-label', ui.sheet === 'settings' ? t('settings') : ui.sheet === 'obl' ? t('mustPay') : ui.sheet === 'goal' ? t('piggies') : ui.sheet === 'debt' ? t('tabDebts') : ui.sheet === 'limit' ? t('budgetTitle') : (draft && draft.id ? t('editOp') : t('newOp')));
  }

  /* ----- Ввод операции ----- */
  var draft = null; // { id?, type, buf, cat, date, note, debtId, needDebt }

  function startAdd() {
    draft = { type: 'out', buf: '', cat: null, date: isoDate(new Date()), note: '', debtId: null, needDebt: false };
    openSheet('add');
  }
  function startEdit(id) {
    var x = data.tx.filter(function (tx) { return tx.id === id; })[0];
    if (!x) return;
    draft = {
      id: x.id, type: x.type, cat: x.cat, date: x.date, note: x.note || '', debtId: payTarget(x), needDebt: x.cat === 'debt' && payables().length > 1,
      buf: String(Math.floor(x.amount / 100)) + (x.amount % 100 ? '.' + pad(x.amount % 100).replace(/0$/, '') : '')
    };
    openSheet('add');
  }

  function bufFils() { return draft.buf ? Math.round(parseFloat(draft.buf) * 100) : 0; }

  function renderAmount() {
    var fils = bufFils();
    var hasDot = draft.buf.indexOf('.') >= 0;
    var whole = draft.buf ? new Intl.NumberFormat(locale()).format(Math.floor(fils / 100)) : '0';
    var dec = hasDot ? (data.lang === 'ru' ? ',' : '.') + draft.buf.split('.')[1] : '';
    return '<span class="money-cur">AED</span><span class="money-big">' + whole + (dec ? '<span class="money-dec">' + dec + '</span>' : '') + '</span>';
  }

  function renderAddSheet() {
    var editing = !!draft.id;
    var cats = draft.type === 'save'
      ? data.goals.map(function (g) { return { id: g.id, goal: g }; })
      : data.categories.filter(function (c) { return c.type === draft.type; });
    var dateLabel = dayTitle(draft.date);
    var debtBlock = '';
    if (draft.needDebt) {
      debtBlock = '<div class="debt-pick"><p>' + esc(t('whichDebt')) + '</p><div>' + payables().map(function (p) {
        return '<button class="chip" type="button" data-action="pick-debt" data-id="' + p.id + '"' + (draft.debtId === p.id ? ' aria-pressed="true"' : '') + '>' + esc(p.name) + '</button>';
      }).join('') + '</div></div>';
    }
    var keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];
    return '<div class="sheet-head">' +
      '<div class="seg is-type" role="radiogroup">' +
      '<button type="button" role="radio" data-action="type" data-type="out" aria-checked="' + (draft.type === 'out') + '">' + esc(t('expense')) + '</button>' +
      '<button type="button" role="radio" data-action="type" data-type="in" aria-checked="' + (draft.type === 'in') + '">' + esc(t('income')) + '</button>' +
      (editing ? '' : '<button type="button" role="radio" data-action="type" data-type="save" aria-checked="' + (draft.type === 'save') + '">' + esc(t('saveTab')) + '</button>') + '</div>' +
      '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="' + esc(t('close')) + '">' + icon('i-close') + '</button></div>' +
      '<div class="amount-view' + (draft.buf ? '' : ' is-empty') + (draft.type === 'in' ? ' is-in' : '') + (draft.type === 'save' ? ' is-save' : '') + '" id="amount-view" aria-live="polite">' + renderAmount() + '</div>' +
      '<p class="amount-hint" id="amount-hint">' + esc(editing || draft.prefill ? t('pickCategoryEdit') : draft.type === 'save' ? t('pickGoal') : t('pickCategory')) + '</p>' +
      '<div class="meta-row">' +
      '<label class="chip">' + icon('i-calendar') + '<span>' + esc(dateLabel) + '</span><input type="date" id="op-date" value="' + draft.date + '" max="' + isoDate(new Date()) + '" aria-label="' + esc(dateLabel) + '"></label>' +
      '<label class="chip chip-note">' + icon('i-note') + '<input id="op-note" maxlength="80" placeholder="' + esc(t('note')) + '" value="' + esc(draft.note) + '" enterkeyhint="done"></label></div>' +
      '<div class="cats">' + cats.map(function (c) {
        if (c.goal) return '<button class="cat" type="button" data-action="cat" data-id="' + c.id + '" aria-pressed="' + (draft.cat === c.id) + '">' + goalIco(c.goal) + '<span>' + esc(c.goal.name) + '</span></button>';
        return '<button class="cat" type="button" data-action="cat" data-id="' + c.id + '" aria-pressed="' + (draft.cat === c.id) + '">' + catIco(c) + '<span>' + esc(catName(c)) + '</span></button>';
      }).join('') + (draft.type === 'save' ? '<button class="cat" type="button" data-action="goal-new"><span class="cat-ico add-ico">' + icon('i-plus') + '</span><span>' + esc(t('newGoal')) + '</span></button>' : '') +
      '</div>' + debtBlock +
      '<div class="keypad">' + keys.map(function (k) {
        if (k === 'back') return '<button class="key" type="button" data-action="key" data-key="back" aria-label="⌫">' + icon('i-backspace') + '</button>';
        var label = k === '.' ? (data.lang === 'ru' ? ',' : '.') : k;
        return '<button class="key" type="button" data-action="key" data-key="' + k + '">' + label + '</button>';
      }).join('') + '</div>' +
      (!editing && !draft.prefill ? '<div class="sheet-actions confirm-bar">' + confirmButton() + '</div>' : '') +
      (draft.prefill && !editing ? '<div class="sheet-actions"><button class="btn btn-primary" type="button" data-action="pay-confirm">' + icon('i-check') + esc(t('payNow')) + '</button></div>' : '') +
      (editing ? '<div class="sheet-actions"><button class="btn btn-danger" type="button" data-action="delete">' + icon('i-trash') + esc(t('del')) + '</button>' +
        '<button class="btn btn-primary" type="button" data-action="save-edit">' + esc(t('save')) + '</button></div>' : '');
  }

  // Кнопка «Добавить · Продукты −45»: пока чего-то не хватает, подсказывает, что именно
  function confirmState() {
    var amount = bufFils();
    var name = null;
    if (draft.cat) {
      if (draft.type === 'save') { var g = goalById(draft.cat); name = g && g.name; }
      else if (draft.cat === 'debt' && draft.debtId) { var pb = payableById(draft.debtId); name = pb ? pb.name : catName(catById('debt')); }
      else name = catName(catById(draft.cat));
    }
    var needPayTarget = draft.cat === 'debt' && !draft.debtId && payables().length > 1;
    if (!amount) return { ok: false, text: t('needAmount') };
    if (!name || needPayTarget) return { ok: false, text: draft.type === 'save' ? t('needGoalPick') : (needPayTarget ? t('whichDebt') : t('needCat')) };
    var sign = draft.type === 'out' ? '−' : '+';
    return { ok: true, text: (draft.type === 'save' ? t('saveTab') : t('confirmAdd')) + ' · ' + name + ' ' + sign + money(amount) };
  }
  function confirmButton() {
    var st = confirmState();
    return '<button class="btn btn-primary btn-block btn-confirm" id="confirm-add" type="button" data-action="confirm-add"' + (st.ok ? '' : ' aria-disabled="true"') + '>' +
      (st.ok ? icon('i-check') : '') + '<span>' + esc(st.text) + '</span></button>';
  }
  function updateConfirm() {
    var b = document.getElementById('confirm-add');
    if (b) b.outerHTML = confirmButton();
  }
  function confirmAdd() {
    syncDraftFields();
    var st = confirmState();
    if (!st.ok) {
      if (!bufFils()) nudgeAmount();
      else { var grid = document.querySelector('.cats'); if (grid) { grid.classList.remove('shake'); void grid.offsetWidth; grid.classList.add('shake'); } }
      return;
    }
    if (draft.type === 'save') commitSave(draft.cat); else commitNew();
  }

  function pressKey(k) {
    var b = draft.buf;
    if (k === 'back') b = b.slice(0, -1);
    else if (k === '.') { if (b.indexOf('.') < 0) b = (b || '0') + '.'; }
    else {
      var parts = b.split('.');
      if (parts.length === 2 && parts[1].length >= 2) return;
      if (parts.length === 1 && parts[0].replace(/^0+/, '').length >= 8) return;
      b = b === '0' ? k : b + k;
    }
    draft.buf = b;
    var view = document.getElementById('amount-view');
    if (view) {
      view.innerHTML = renderAmount();
      view.classList.toggle('is-empty', !draft.buf);
      updateConfirm();
    }
  }

  function nudgeAmount() {
    var view = document.getElementById('amount-view');
    var hint = document.getElementById('amount-hint');
    if (hint) hint.textContent = t('enterAmount');
    if (view) { view.classList.remove('shake'); void view.offsetWidth; view.classList.add('shake'); }
  }

  function syncDraftFields() {
    var n = document.getElementById('op-note');
    if (n) draft.note = n.value.trim();
  }

  function chooseCat(id) {
    syncDraftFields();
    draft.cat = id;
    if (draft.type === 'save') { drawSheet(); return; }
    var pays = payables();
    if (id === 'debt' && pays.length) {
      if (pays.length === 1) draft.debtId = pays[0].id;
      else if (!draft.debtId) { draft.needDebt = true; drawSheet(); return; }
    } else {
      draft.debtId = null; draft.needDebt = false;
    }
    drawSheet();
  }

  function commitSave(goalId) {
    var amount = bufFils();
    var g = goalById(goalId);
    if (!amount) { drawSheet(); nudgeAmount(); return; }
    if (!g) return;
    var x = { id: uid(), type: 'save', cat: 'save', goalId: goalId, amount: amount, date: draft.date, note: draft.note, created: Date.now() };
    data.tx.push(x);
    persist(); closeSheet();
    if (x.date.slice(0, 7) !== ui.month) ui.month = x.date.slice(0, 7);
    render();
    toast(t('moved', { g: g.name, x: '+' + money(amount) }), function () { removeTx(x.id); });
  }

  function commitNew() {
    var amount = bufFils();
    if (!amount) { drawSheet(); nudgeAmount(); return; }
    var x = { id: uid(), type: draft.type, amount: amount, cat: draft.cat, date: draft.date, note: draft.note, created: Date.now() };
    setTarget(x, draft.cat === 'debt' ? draft.debtId : null);
    data.tx.push(x);
    applyDebt(x, 1);
    persist();
    closeSheet();
    if (x.date.slice(0, 7) !== ui.month) ui.month = x.date.slice(0, 7);
    render();
    var msg = t('added') + ' · ' + catName(catById(x.cat)) + ' ' + (x.type === 'in' ? '+' : '−') + money(x.amount);
    var lim = x.type === 'out' && data.budget.cats[x.cat];
    if (lim) {
      var spent = txOfMonth(x.date.slice(0, 7)).reduce(function (a, y) { return a + (y.type === 'out' && y.cat === x.cat ? y.amount : 0); }, 0);
      var pct = Math.round((spent / lim) * 100);
      if (spent > lim) msg = t('limitOver', { c: catName(catById(x.cat)) });
      else if (pct >= 80) msg = t('limitNear', { c: catName(catById(x.cat)), p: pct });
    }
    toast(msg, function () {
      removeTx(x.id);
    });
  }

  function saveEdit() {
    syncDraftFields();
    var amount = bufFils();
    if (!amount) { nudgeAmount(); return; }
    if (!draft.cat) return;
    if (draft.cat === 'debt' && !draft.debtId && payables().length) { draft.needDebt = true; drawSheet(); return; }
    var x = data.tx.filter(function (tx) { return tx.id === draft.id; })[0];
    if (!x) return;
    applyDebt(x, -1);
    x.type = draft.type; x.amount = amount; x.cat = draft.cat; x.date = draft.date; x.note = draft.note;
    setTarget(x, draft.cat === 'debt' ? draft.debtId : null);
    applyDebt(x, 1);
    persist();
    closeSheet();
    render();
    toast(t('saved'));
  }

  function setTarget(x, id) {
    delete x.debtId; delete x.oblId;
    if (!id) return;
    if (data.debts.some(function (d) { return d.id === id; })) x.debtId = id; else x.oblId = id;
  }

  // Нажал на неоплаченный обязательный платёж: всё уже заполнено, остаётся подтвердить
  function startPay(id) {
    var p = payableById(id);
    if (!p) return;
    var date = isoDate(new Date());
    if (ui.month !== monthKey(new Date())) date = ui.month + '-' + pad(Math.min(new Date().getDate(), daysInMonth(ui.month)));
    var whole = Math.floor(p.amount / 100), dec = p.amount % 100;
    draft = { type: 'out', buf: String(whole) + (dec ? '.' + pad(dec).replace(/0$/, '') : ''), cat: 'debt', date: date, note: '', debtId: id, needDebt: true, prefill: true };
    openSheet('add');
  }

  // Платёж по долгу уменьшает остаток; удаление/правка возвращает как было
  function applyDebt(x, dir) {
    if (!x.debtId || x.type !== 'out') return;
    var d = data.debts.filter(function (dd) { return dd.id === x.debtId; })[0];
    if (!d) return;
    if (dir > 0) {
      var interest = Math.round(d.balance * (d.rate || 0) / 100 / 12);
      var principal = Math.min(d.balance, Math.max(0, x.amount - interest));
      d.balance -= principal;
      x.principal = principal;
    } else {
      d.balance += x.principal != null ? x.principal : x.amount;
      delete x.principal;
    }
  }

  function removeTx(id) {
    var i = -1;
    data.tx.forEach(function (x, j) { if (x.id === id) i = j; });
    if (i < 0) return null;
    var x = data.tx.splice(i, 1)[0];
    applyDebt(x, -1);
    persist();
    render();
    return x;
  }

  function deleteCurrent() {
    var x = removeTx(draft.id);
    closeSheet();
    if (x) toast(t('deleted'), function () { data.tx.push(x); applyDebt(x, 1); persist(); render(); });
  }

  /* ----- Свои обязательные платежи ----- */
  var oblMode = 'new';
  function renderObl() {
    var list = oblMode === 'manage' ? data.obligations.map(function (o) {
      return '<div class="row obl-row"><span class="row-main"><span class="row-title" style="display:block">' + esc(o.name) + '</span>' +
        '<span class="row-sub" style="display:block">AED ' + money(o.amount) + '</span></span>' +
        '<button class="btn btn-danger" type="button" data-action="obl-remove" data-id="' + o.id + '">' + icon('i-trash') + esc(t('remove')) + '</button></div>';
    }).join('') : '';
    return '<div class="sheet-head"><h2>' + esc(t('mustPay')) + '</h2>' +
      '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="' + esc(t('close')) + '">' + icon('i-close') + '</button></div>' +
      (list ? '<div class="list obl-list">' + list + '</div>' : '') +
      '<div class="field"><label class="field-label" for="obl-name">' + esc(t('oblName')) + '</label>' +
      '<div class="input-wrap"><input id="obl-name" maxlength="40" autocomplete="off" placeholder="' + esc(t('oblNamePh')) + '"' + (list ? '' : ' data-autofocus') + '></div></div>' +
      '<div class="field"><label class="field-label" for="obl-amount">' + esc(t('oblAmount')) + '</label>' +
      '<div class="input-wrap"><span>AED</span><input id="obl-amount" inputmode="decimal" autocomplete="off" placeholder="0"></div></div>' +
      '<p class="version" style="text-align:left;margin:0 4px 16px;font-size:13.5px">' + esc(t('oblHint')) + '</p>' +
      '<button class="btn btn-primary btn-block" type="button" data-action="obl-save">' + icon('i-plus') + esc(t('add')) + '</button>';
  }
  function saveObl() {
    var name = (document.getElementById('obl-name').value || '').trim();
    var amount = parseMoney(document.getElementById('obl-amount').value);
    if (!name || !amount) { toast(t('needName')); return; }
    data.obligations.push({ id: 'o' + uid(), name: name, amount: amount });
    persist(); closeSheet(); render(); toast(t('oblSaved'));
  }

  /* ----- Настройки ----- */
  function renderSettings() {
    var themes = [['auto', 'themeAuto'], ['light', 'themeLight'], ['dark', 'themeDark']];
    return '<div class="sheet-head"><h2>' + esc(t('settings')) + '</h2>' +
      '<button class="icon-btn" type="button" data-action="close-sheet" aria-label="' + esc(t('close')) + '">' + icon('i-close') + '</button></div>' +
      '<div class="field"><span class="field-label">' + esc(t('language')) + '</span>' + langSeg() + '</div>' +
      '<div class="field"><span class="field-label">' + esc(t('theme')) + '</span><div class="seg" role="radiogroup" aria-label="' + esc(t('theme')) + '">' +
      themes.map(function (th) {
        return '<button type="button" role="radio" data-action="theme" data-theme-pick="' + th[0] + '" aria-checked="' + (data.theme === th[0]) + '">' + esc(t(th[1])) + '</button>';
      }).join('') + '</div></div>' +
      '<div class="field"><span class="field-label">' + esc(t('data')) + '</span><div class="data-btns">' +
      '<button class="btn btn-quiet" type="button" data-action="export">' + icon('i-download') + esc(t('exportData')) + '</button>' +
      '<label class="btn btn-quiet file-btn">' + icon('i-upload') + esc(t('importData')) + '<input type="file" id="import-file" accept="application/json,.json"></label></div>' +
      '<p class="version" style="text-align:left;margin:10px 4px 0;font-size:13.5px">' + esc(t('dataNote')) + '</p></div>' +
      '<p class="version">' + esc(t('version', { v: VERSION })) + '</p>';
  }

  function exportData() {
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'finkit-' + isoDate(new Date()) + '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function importData(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var d = JSON.parse(reader.result);
        if (!d || d.v !== 1 || !Array.isArray(d.tx)) throw new Error('bad');
        if (!window.confirm(t('importConfirm'))) return;
        data = normalize(d);
        data.onboarded = true;
        persist();
        closeSheet();
        render();
        toast(t('importOk'));
      } catch (e) {
        toast(t('importBad'));
      }
    };
    reader.readAsText(file);
  }

  /* ---------- Тост с «Отменить» ---------- */
  var toastEl = document.getElementById('toast');
  var toastTimer = null;
  function toast(text, undo) {
    clearTimeout(toastTimer);
    toastEl.innerHTML = '<span>' + esc(text) + '</span>' + (undo ? '<button type="button" data-action="undo">' + esc(t('undo')) + '</button>' : '');
    toastEl.hidden = false;
    toastEl._undo = undo || null;
    requestAnimationFrame(function () { toastEl.classList.add('is-on'); });
    toastTimer = setTimeout(hideToast, undo ? 5000 : 2600);
  }
  function hideToast() {
    toastEl.classList.remove('is-on');
    toastEl._undo = null;
    setTimeout(function () { if (!toastEl.classList.contains('is-on')) toastEl.hidden = true; }, 300);
  }

  /* ---------- События ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var a = el.getAttribute('data-action');
    switch (a) {
      case 'tab': ui.tab = el.getAttribute('data-tab'); if (ui.tab === 'home') ui.intro = true; render(); window.scrollTo(0, 0); break;
      case 'add': startAdd(); break;
      case 'month': ui.month = shiftMonth(ui.month, +el.getAttribute('data-delta')); ui.intro = true; render(); break;
      case 'month-pick': ui.month = el.getAttribute('data-month'); render(); break;
      case 'settings': openSheet('settings'); break;
      case 'limit': limitKey = el.getAttribute('data-key'); openSheet('limit'); break;
      case 'limit-save': saveLimit(false); break;
      case 'limit-remove': saveLimit(true); break;
      case 'close-sheet': closeSheet(); break;
      case 'edit': startEdit(el.getAttribute('data-id')); break;
      case 'type':
        syncDraftFields();
        var newType = el.getAttribute('data-type');
        if (newType !== draft.type) { draft.cat = null; draft.debtId = null; draft.needDebt = false; }
        draft.type = newType;
        drawSheet(); break;
      case 'key': pressKey(el.getAttribute('data-key')); break;
      case 'cat': chooseCat(el.getAttribute('data-id')); break;
      case 'pick-debt':
        syncDraftFields();
        draft.debtId = el.getAttribute('data-id');
        draft.needDebt = true; // выбор долга остаётся видимым, сохраняем кнопкой
        drawSheet();
        break;
      case 'save-edit': saveEdit(); break;
      case 'confirm-add': confirmAdd(); break;
      case 'goal':
        goalUI = { id: el.getAttribute('data-id'), mode: 'view' };
        if (ui.sheet) { ui.sheet = 'goal'; drawSheet(); } else openSheet('goal');
        break;
      case 'goal-new':
        goalUI = { id: null, mode: 'new' };
        if (ui.sheet) { ui.sheet = 'goal'; drawSheet(); var gn = document.getElementById('goal-name'); if (gn) gn.focus(); } else openSheet('goal');
        break;
      case 'goal-edit': goalUI.mode = 'edit'; drawSheet(); break;
      case 'debt': debtUI = { id: el.getAttribute('data-id'), mode: 'view' }; openSheet('debt'); break;
      case 'debt-new': debtUI = { id: null, mode: 'new' }; openSheet('debt'); break;
      case 'debt-edit': debtUI.mode = 'edit'; drawSheet(); break;
      case 'debt-view': debtUI.mode = 'view'; drawSheet(); break;
      case 'debt-save': saveDebt(); break;
      case 'debt-delete': {
        var dd = debtById(debtUI.id);
        if (dd && window.confirm(t('debtDeleteConfirm', { n: debtName(dd) }))) {
          data.debts = data.debts.filter(function (d) { return d.id !== dd.id; });
          persist(); closeSheet(); render(); toast(t('debtDeleted'));
        }
        break;
      }
      case 'goal-view': goalUI.mode = 'view'; drawSheet(); break;
      case 'goal-save': saveGoal(); break;
      case 'goal-move': moveGoal(+el.getAttribute('data-dir')); break;
      case 'move-delete': removeTx(el.getAttribute('data-id')); drawSheet(); break;
      case 'goal-delete': {
        var gd = goalById(goalUI.id);
        if (gd && window.confirm(t('goalDeleteConfirm', { n: gd.name }))) {
          data.goals = data.goals.filter(function (g) { return g.id !== gd.id; });
          data.tx = data.tx.filter(function (x) { return !(x.type === 'save' && x.goalId === gd.id); });
          persist(); closeSheet(); render(); toast(t('goalDeleted'));
        }
        break;
      }
      case 'pay': if (ui.sheet) { ui.sheet = null; layer.classList.remove('is-open'); layer.hidden = true; } startPay(el.getAttribute('data-id')); break;
      case 'pay-confirm': syncDraftFields(); commitNew(); break;
      case 'obl-new': oblMode = 'new'; openSheet('obl'); break;
      case 'obl-manage': oblMode = 'manage'; openSheet('obl'); break;
      case 'obl-save': saveObl(); break;
      case 'obl-remove': {
        var oid = el.getAttribute('data-id');
        data.obligations = data.obligations.filter(function (o) { return o.id !== oid; });
        persist(); render();
        if (!data.obligations.length) closeSheet(); else drawSheet();
        toast(t('oblRemoved'));
        break;
      }
      case 'delete': deleteCurrent(); break;
      case 'lang': data.lang = el.getAttribute('data-lang'); persist(); render(); if (ui.sheet) drawSheet(); break;
      case 'theme': data.theme = el.getAttribute('data-theme-pick'); persist(); applyTheme(); drawSheet(); break;
      case 'export': exportData(); break;
      case 'undo': if (toastEl._undo) { var fn = toastEl._undo; hideToast(); fn(); } break;
      case 'welcome-next': ui.welcomeStep = 1; render(); setTimeout(function () { var i = document.getElementById('welcome-budget'); if (i) i.focus(); }, 60); break;
      case 'welcome-done': {
        var v = parseMoney((document.getElementById('welcome-budget') || {}).value);
        if (v) data.budget.month = v;
        data.onboarded = true; persist(); ui.intro = true; render(); break;
      }
      case 'welcome-skip': data.onboarded = true; persist(); render(); break;
    }
  });

  document.addEventListener('change', function (e) {
    if (e.target.id === 'op-date' && draft) {
      syncDraftFields();
      if (e.target.value) draft.date = e.target.value;
      drawSheet();
    }
    if (e.target.id === 'import-file' && e.target.files && e.target.files[0]) importData(e.target.files[0]);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ui.sheet) { closeSheet(); return; }
    // На компьютере сумму можно набирать с клавиатуры
    if (ui.sheet === 'add' && draft && document.activeElement && document.activeElement.tagName !== 'INPUT') {
      if (/^[0-9]$/.test(e.key)) { pressKey(e.key); e.preventDefault(); }
      else if (e.key === '.' || e.key === ',') { pressKey('.'); e.preventDefault(); }
      else if (e.key === 'Backspace') { pressKey('back'); e.preventDefault(); }
      else if (e.key === 'Enter' && !draft.id && !draft.prefill) { confirmAdd(); e.preventDefault(); }
    }
    if (e.key === 'Enter' && e.target.id === 'limit-input') saveLimit(false);
    if (e.key === 'Enter' && e.target.id === 'obl-amount') saveObl();
    if (e.key === 'Enter' && e.target.id === 'goal-amount') moveGoal(1);
    if (e.key === 'Enter' && e.target.id === 'op-note') e.target.blur();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  var resizeTimer = null;
  window.addEventListener('resize', function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(function () { if (ui.tab === 'overview') drawFlowChart(); }, 150); });

  // Новый день или новый месяц, пока приложение было свёрнуто
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && !ui.sheet && data.onboarded) render();
  });

  render();

  // Заставка: сама уезжает по CSS; здесь только пропуск по нажатию и уборка
  (function () {
    var intro = document.getElementById('intro');
    if (!intro) return;
    var done = function () {
      if (!intro.parentNode) return;
      intro.parentNode.removeChild(intro);
      document.body.classList.remove('intro-run');
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { done(); return; }
    intro.addEventListener('click', function () {
      intro.classList.add('is-skip');
      document.body.classList.remove('intro-run');
      setTimeout(done, 240);
    });
    setTimeout(done, 1900);
  })();

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
