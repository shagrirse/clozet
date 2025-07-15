-- Create the cleanup procedure
CREATE OR REPLACE PROCEDURE cleanup_expired_telegram_codes() AS $$
BEGIN
  DELETE FROM "TelegramOnboardingCode" WHERE "expiresAt" < NOW();
END;
$$ LANGUAGE plpgsql;
-- This will clean up expired onboarding codes every hour
-- Very hacky but works. Thank you https://github.com/prisma/prisma/issues/18214#issuecomment-1747538985
DO $$
BEGIN
IF current_database() = 'clozet' THEN
  CREATE EXTENSION IF NOT EXISTS pg_cron;
  PERFORM cron.schedule(
    'cleanup_expired_telegram_codes',
    '* * * * *',
    'CALL cleanup_expired_telegram_codes()'
  );
END IF;
END $$;