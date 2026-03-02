/**
 * Tool groups and no-coder friendly labels for the Manual and Settings UI.
 * Keys are the tool id (function name). Group order determines display order.
 */

export const TOOL_GROUP_ORDER = [
  'bases',
  'tables',
  'fields',
  'records',
  'attachments_and_import',
  'views',
  'webhooks',
  'history_and_privacy',
  'other',
];

export const TOOL_GROUP_LABELS = {
  bases: {
    title: 'Bases (werken met Airtable-bases)',
    description: 'Bases zijn je hoofddatabases in Airtable. Hier vind je tools om bases op te lijsten, aan te maken of de opbouw te bekijken.',
  },
  tables: {
    title: 'Tabellen',
    description: 'Tabellen zitten in een base. Met deze tools maak je nieuwe tabellen aan of pas je bestaande tabellen aan.',
  },
  fields: {
    title: 'Velden (kolommen)',
    description: 'Velden zijn de kolommen in een tabel (bijv. tekst, getal, datum). Hier voeg je velden toe of wijzig je ze.',
  },
  records: {
    title: 'Records (rijen met data)',
    description: 'Records zijn de rijen in je tabel. Lezen, aanmaken, wijzigen en verwijderen van gegevens doe je met deze tools.',
  },
  attachments_and_import: {
    title: 'Bijlagen en importeren',
    description: 'Bestanden aan records koppelen of data uit CSV importeren in een tabel.',
  },
  views: {
    title: 'Weergaven',
    description: 'Weergaven zijn verschillende manieren om dezelfde tabel te tonen (filter, sortering). Bekijk of beheer weergaven.',
  },
  webhooks: {
    title: 'Webhooks (real-time meldingen)',
    description: 'Webhooks sturen een melding naar jouw URL wanneer er iets in een base verandert. Handig voor automatische integraties.',
  },
  history_and_privacy: {
    title: 'Geschiedenis en privacy',
    description: 'Voor geavanceerd gebruik: celgeschiedenis en gegevensanonimisering (o.a. Enterprise).',
  },
  other: {
    title: 'Overige tools',
    description: 'Andere beschikbare tools.',
  },
};

/** Tool id → { group, title, shortDescription } for Manual/Settings. */
export const TOOL_LABELS = {
  list_bases: {
    group: 'bases',
    title: 'Bases tonen',
    shortDescription: 'Toont een lijst van alle Airtable-bases waar je toegang toe hebt. Handig om je base-ID te vinden.',
  },
  meta_whoami: {
    group: 'bases',
    title: 'Huidige gebruiker en rechten',
    shortDescription: 'Toont wie er is ingelogd (gebruiker-ID) en welke rechten (scopes) de token heeft. Handig om je token te controleren.',
  },
  create_base: {
    group: 'bases',
    title: 'Nieuwe base aanmaken',
    shortDescription: 'Maakt een nieuwe lege base aan in je workspace. Daarna kun je tabellen en velden toevoegen.',
  },
  get_base_schema: {
    group: 'bases',
    title: 'Opbouw van een base bekijken',
    shortDescription: 'Haalt de structuur van een base op: alle tabellen en velden. Nodig om te weten welke velden er zijn.',
  },
  create_table: {
    group: 'tables',
    title: 'Nieuwe tabel aanmaken',
    shortDescription: 'Voegt een nieuwe tabel toe aan een bestaande base. Je kunt ook meteen velden meegeven.',
  },
  update_table: {
    group: 'tables',
    title: 'Tabel aanpassen',
    shortDescription: 'Past de naam of andere eigenschappen van een tabel aan.',
  },
  create_field: {
    group: 'fields',
    title: 'Nieuw veld toevoegen',
    shortDescription: 'Voegt een nieuwe kolom toe aan een tabel (tekst, getal, datum, keuzelijst, enz.).',
  },
  update_field: {
    group: 'fields',
    title: 'Veld aanpassen',
    shortDescription: 'Past een bestaand veld aan (naam, type of opties).',
  },
  list_records: {
    group: 'records',
    title: 'Records ophalen (lijst)',
    shortDescription: 'Haalt rijen uit een tabel op. Je kunt filteren, sorteren en bladeren (paginatie). Max. 100 per pagina.',
  },
  list_records_post: {
    group: 'records',
    title: 'Records ophalen via POST',
    shortDescription: 'Zelfde als "Records ophalen", maar via POST. Gebruik dit bij veel filters zodat de URL niet te lang wordt.',
  },
  get_record: {
    group: 'records',
    title: 'Eén record ophalen',
    shortDescription: 'Haalt één specifieke rij op via het record-ID.',
  },
  create_records: {
    group: 'records',
    title: 'Nieuwe records aanmaken',
    shortDescription: 'Voegt één of meerdere nieuwe rijen toe aan een tabel. Je vult de velden per record in.',
  },
  update_record: {
    group: 'records',
    title: 'Eén record wijzigen',
    shortDescription: 'Past één bestaande rij aan. Je geeft de velden op die moeten veranderen.',
  },
  update_multiple_records: {
    group: 'records',
    title: 'Meerdere records wijzigen',
    shortDescription: 'Past meerdere rijen in één keer aan. Handig voor bulk-updates.',
  },
  delete_record: {
    group: 'records',
    title: 'Eén record verwijderen',
    shortDescription: 'Verwijdert één rij definitief uit de tabel.',
  },
  delete_multiple_records: {
    group: 'records',
    title: 'Meerdere records verwijderen',
    shortDescription: 'Verwijdert meerdere rijen in één keer. Je geeft de record-IDs op.',
  },
  upload_attachment: {
    group: 'attachments_and_import',
    title: 'Bestand uploaden naar een record',
    shortDescription: 'Koppelt een bestand (afbeelding, PDF, enz.) aan een bestaand record.',
  },
  sync_csv_data: {
    group: 'attachments_and_import',
    title: 'CSV importeren in een tabel',
    shortDescription: 'Importeert gegevens uit een CSV-bestand in een Airtable-tabel. Handig voor eenmalige imports.',
  },
  list_views: {
    group: 'views',
    title: 'Weergaven tonen',
    shortDescription: 'Toont alle weergaven (views) van een base. Elke weergave heeft een eigen filter/sortering.',
  },
  get_view_metadata: {
    group: 'views',
    title: 'Details van een weergave bekijken',
    shortDescription: 'Haalt de instellingen van één weergave op (velden, filters, sorteervolgorde).',
  },
  delete_view: {
    group: 'views',
    title: 'Weergave verwijderen',
    shortDescription: 'Verwijdert een weergave. De onderliggende tabel en data blijven bestaan.',
  },
  create_webhook: {
    group: 'webhooks',
    title: 'Webhook aanmaken',
    shortDescription: 'Registreert een URL waar Airtable naartoe stuurt bij wijzigingen in de base. Bewaar het teruggegeven geheim om meldingen te valideren.',
  },
  list_webhooks: {
    group: 'webhooks',
    title: 'Webhooks tonen',
    shortDescription: 'Toont alle webhooks van een base. Gebruik dit om webhook-IDs te vinden.',
  },
  update_webhook: {
    group: 'webhooks',
    title: 'Webhook aanpassen',
    shortDescription: 'Past een bestaande webhook aan (bijv. andere notificatie-URL of filters).',
  },
  delete_webhook: {
    group: 'webhooks',
    title: 'Webhook verwijderen',
    shortDescription: 'Verwijdert een webhook. Er worden daarna geen meldingen meer naar die URL gestuurd.',
  },
  list_webhook_payloads: {
    group: 'webhooks',
    title: 'Webhook-meldingen ophalen',
    shortDescription: 'Haalt de gebeurtenissen (payloads) van een webhook op. Gebruik cursor voor paginering; bewaar de cursor voor de volgende keer.',
  },
  redact_history: {
    group: 'history_and_privacy',
    title: 'Geschiedenis anonimiseren',
    shortDescription: 'Verwijdert of anonimiseert celgeschiedenis (o.a. voor privacy). Vaak Enterprise-functie.',
  },
  read_cell_history_redactions: {
    group: 'history_and_privacy',
    title: 'Anonimiseringen van geschiedenis opvragen',
    shortDescription: 'Leest welke celgeschiedenis er geanonimiseerd is. Voor audit en compliance.',
  },
  delete_cell_history_redaction: {
    group: 'history_and_privacy',
    title: 'Anonimisering van geschiedenis verwijderen',
    shortDescription: 'Verwijdert een eerder toegepaste anonimisering van celgeschiedenis.',
  },
};

/**
 * @param {string} toolId
 * @returns {{ group: string, title: string, shortDescription: string }}
 */
export function getToolLabel(toolId) {
  const def = TOOL_LABELS[toolId];
  if (def) return { ...def };
  return {
    group: 'other',
    title: toolId,
    shortDescription: 'Geen beschrijving beschikbaar.',
  };
}
