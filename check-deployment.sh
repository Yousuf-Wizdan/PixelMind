#!/bin/bash
# Deployment check script

echo "Checking deployment readiness..."

# Check if essential files exist
files=(
  "package.json"
  "next.config.ts"
  "prisma/schema.prisma"
  ".env.example"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✓ $file exists"
  else
    echo "✗ $file missing"
  fi
done

# Check if essential environment variables are documented
if grep -q "DATABASE_URL" .env.example; then
  echo "✓ DATABASE_URL documented"
else
  echo "✗ DATABASE_URL not documented"
fi

if grep -q "BETTER_AUTH_SECRET" .env.example; then
  echo "✓ BETTER_AUTH_SECRET documented"
else
  echo "✗ BETTER_AUTH_SECRET not documented"
fi

echo "Deployment check complete!"