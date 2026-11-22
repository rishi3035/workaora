/**
 * The one database these tests are allowed to touch.
 *
 * This is the reference of the DEVELOPMENT project (workaora-dev-mumbai).
 * It is part of the project's public address, so it is not a secret.
 *
 * The database tests create and delete test accounts. They refuse to run
 * against any other project, so they can never touch a production database
 * even if .env.local is pointed at one by mistake (decision D-004).
 */
export const DEV_PROJECT_REF = "aysjinjtabhgozxxffwa";
