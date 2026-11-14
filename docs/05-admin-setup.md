# Admin setup (Supabase, free)

About 10 minutes. Do these once.

## 1. Create the project
1. Go to https://supabase.com and sign up (free plan).
2. **New project** → name `angels`, region **South Asia (Mumbai)**, set a database password and keep it somewhere safe.

## 2. Create the tables
1. Left menu → **SQL Editor** → **New query**.
2. Paste everything from `supabase/schema.sql` → **Run**. It should say "Success".

## 3. Create logins for Merlin and Vijisha
1. Left menu → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter Merlin's email and a password, tick **Auto Confirm User**, create. Repeat for Vijisha.
3. Back in **SQL Editor**, run this with their real emails:

```sql
insert into public.admins (user_id, name)
select id, case email when 'merlin@example.com' then 'Merlin' else 'Vijisha' end
from auth.users
where email in ('merlin@example.com', 'vijisha@example.com');
```

4. **Authentication** → **Sign In / Providers** → turn **off** "Allow new users to sign up".

## 4. Send the two public keys
Click **Connect** at the top of the project and copy:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Both are safe to share; they are built into the public website. **Never share the secret / service_role key.**

## Using the admin
Open `https://<your-site>/admin` and sign in.

| Section | What it does |
|---|---|
| Dashboard | Enquiries, conversions, money earned, WhatsApp and call taps — by month, service, source and team member |
| Enquiries | Website form enquiries arrive automatically. Add WhatsApp / phone / walk-in enquiries by hand. Set status to **Booked** or **Completed** and enter the **amount charged** |
| Services & prices | Add, hide, reorder services; set "Starting from ₹" prices; per-service Google title/description |
| Photos | Replace any photo from a phone or computer — resized automatically |
| Page text | Every heading and paragraph, English and Malayalam |
| Banner | Announcement strip at the top of every page |
| Lookbook | Lookbook photos, Instagram strip, testimonials |
| SEO | Google titles/descriptions per page, Search Console / Bing verification |
| Business details | Phone, WhatsApp, Instagram, address, hours |

Changes appear on the live site within about a minute.
