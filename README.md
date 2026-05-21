# 25 do Pedro - Site de Presenca

## Visao geral
Site profissional para confirmacao de presenca do aniversario do Pedro, com
programacao, detalhes do evento e formulario integrado ao Supabase.

## Rodar localmente
1. Instale dependencias: `npm install`
2. Copie o arquivo `.env.local.example` para `.env.local`
3. Preencha as variaveis do Supabase
4. Inicie o servidor: `npm run dev`

## Supabase
Crie um projeto no Supabase e configure as variaveis abaixo em `.env.local` e
no deploy:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Crie a tabela com o SQL abaixo:

```sql
create table if not exists public.rsvps (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	email text not null,
	phone text not null,
	guests integer not null,
	attendance text not null,
	message text,
	created_at timestamptz not null default now()
);
```

Para evitar duplicidade de confirmacoes, adicione um indice unico no email:

```sql
create unique index if not exists rsvps_email_unique on public.rsvps (email);
```

## Scripts
- `npm run dev` inicia o ambiente local
- `npm run build` gera o build de producao
- `npm run start` roda o build gerado
