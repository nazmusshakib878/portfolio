import type { BlogPost } from '@/types/blog'

export const blogPosts: BlogPost[] = [
  {
    slug: 'laravel-sanctum-authentication',
    title: 'Laravel REST API Authentication with Sanctum',
    summary:
      'A practical guide to securing decoupled APIs with Laravel Sanctum, personal access tokens, and route middleware protection.',
    category: 'Laravel / Backend',
    tags: ['Laravel', 'Sanctum', 'REST API', 'Authentication'],
    publishedAt: '2026-08-26',
    formattedDate: 'August 26, 2026',
    readingTime: '6 min read',
    featured: true,
    isDraft: true,
    introduction:
      'When building decoupled modern web applications—such as pairing a React or Next.js client with a Laravel backend—securing API communication without heavy OAuth2 infrastructure overhead is a critical architectural requirement. Laravel Sanctum provides a lightweight, token-based authentication system tailored for mobile apps, SPAs, and simple token-driven REST APIs.',
    sections: [
      {
        heading: 'Why Laravel Sanctum for REST APIs?',
        content: [
          'Traditional session-based authentication relies on browser cookies and CSRF tokens tied to the same domain. In decoupled full-stack architectures, client applications frequently run on separate domains or mobile viewports where stateless Bearer tokens are required.',
          'Laravel Sanctum solves this by issuing cryptographically secure personal access tokens stored in your database. Each incoming HTTP request validates the Bearer token against the personal_access_tokens table without requiring the complexity of a full OAuth2 server like Laravel Passport.',
        ],
        codeBlock: {
          language: 'php',
          filename: 'app/Http/Controllers/Api/AuthController.php',
          code: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Requests\\LoginRequest;
use App\\Models\\User;
use Illuminate\\Support\\Facades\\Hash;
use Illuminate\\Validation\\ValidationException;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials do not match our records.'],
            ]);
        }

        // Issue a plaintext Sanctum Bearer Token with specific abilities
        $token = $user->createToken('auth-token', ['read', 'write'])->plainTextToken;

        return response()->json([
            'status' => 'success',
            'token'  => $token,
            'user'   => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
        ]);
    }

    public function logout()
    {
        // Revoke the current token that authenticated the active request
        request()->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }
}`,
        },
      },
      {
        heading: 'Protecting Endpoints with Route Middleware',
        content: [
          'Once tokens are generated, endpoints are secured using the auth:sanctum route middleware in routes/api.php. Any unauthorized requests automatically receive an HTTP 401 Unauthorized response.',
        ],
        codeBlock: {
          language: 'php',
          filename: 'routes/api.php',
          code: `<?php

use App\\Http\\Controllers\\Api\\AuthController;
use App\\Http\\Controllers\\Api\\StudentController;
use Illuminate\\Support\\Facades\\Route;

// Public authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Authenticated route group protected by Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn (Request $request) => $request->user());
    Route::get('/students', [StudentController::class, 'index']);
    Route::post('/students', [StudentController::class, 'store']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});`,
        },
      },
      {
        heading: 'Client Integration: Handling Bearer Tokens in React',
        content: [
          'On the frontend client (React or Next.js), the issued token is persisted (e.g., in secure storage or memory) and attached to the Authorization header of all outgoing HTTP requests.',
        ],
        codeBlock: {
          language: 'typescript',
          filename: 'src/lib/api-client.ts',
          code: `export async function fetchWithAuth<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('auth_token')

  const response = await fetch(\`https://api.example.com\${endpoint}\`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
      ...options.headers,
    },
  })

  if (response.status === 401) {
    // Handle expired token or unauthorized access
    localStorage.removeItem('auth_token')
    window.location.href = '/login'
    throw new Error('Session expired. Please log in again.')
  }

  return response.json()
}`,
        },
      },
    ],
    realWorldUseCase: {
      title: 'Decoupled Academic Platform (AI Smart Campus)',
      scenario:
        'A university management system with a standalone React/Vite client communicating with a Laravel 12 API backend across different subdomains.',
      implementation:
        'Configured Laravel Sanctum personal access tokens. When students and faculty authenticate, Sanctum issues scoped Bearer tokens that the React application attaches to asynchronous query requests and AI assistant proxy endpoints.',
      impact:
        'Eliminated cross-origin cookie synchronization bugs while providing instant token revocation on logout and preventing unauthorized database access.',
    },
    keyTakeaways: [
      'Sanctum delivers lightweight personal access tokens without the configuration overhead of OAuth2 Passport servers.',
      'Always validate requests using dedicated FormRequest classes before issuing authentication tokens.',
      'Revoke specific tokens using $user->currentAccessToken()->delete() during logout to enforce strict session invalidation.',
      'Leverage Sanctum abilities (token scopes) to restrict write permissions for read-only clients.',
    ],
  },
  {
    slug: 'laravel-mvc-architecture',
    title: 'Laravel MVC Architecture Explained',
    summary:
      'Understanding the Model-View-Controller pattern in Laravel and scaling beyond basic controllers with service layers and repository abstractions.',
    category: 'Laravel / Architecture',
    tags: ['Laravel', 'MVC', 'PHP', 'Architecture'],
    publishedAt: '2026-08-26',
    formattedDate: 'August 26, 2026',
    readingTime: '5 min read',
    featured: true,
    isDraft: true,
    introduction:
      'The Model-View-Controller (MVC) architectural pattern is the foundational blueprint of Laravel. By separating data persistence, business logic, and presentation concerns, MVC ensures that web applications remain testable, maintainable, and modular as codebase complexity scales.',
    sections: [
      {
        heading: 'The 3 Pillars of Laravel MVC',
        content: [
          'At its core, Laravel coordinates request lifecycles across three distinct components:',
          '1. Model (Data & Relationships): Eloquent models represent database tables, handle business rules, casting, and define relational integrity (e.g., hasMany, belongsTo).',
          '2. View (Presentation): Blade templates or structured JSON API responses responsible for rendering information to users without containing business calculations.',
          '3. Controller (Coordination): The traffic coordinator that receives HTTP requests, delegates work to models or services, and returns appropriate views or responses.',
        ],
        codeBlock: {
          language: 'php',
          filename: 'app/Models/Booking.php',
          code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'service_id',
        'time_slot_id',
        'booking_date',
        'status',
    ];

    // Relational Integrity: A Booking belongs to a Service & User
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}`,
        },
      },
      {
        heading: 'Avoiding Fat Controllers with Service Layers',
        content: [
          'A common architectural pitfall in growing Laravel applications is bloating controllers with validation, payment calculations, email notifications, and database transactions. To maintain clean separation of concerns, extract domain workflows into dedicated Service classes.',
        ],
        codeBlock: {
          language: 'php',
          filename: 'app/Services/BookingService.php',
          code: `<?php

namespace App\\Services;

use App\\Models\\Booking;
use Illuminate\\Support\\Facades\\DB;
use App\\Exceptions\\SlotConflictException;

class BookingService
{
    public function createBooking(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            // Check for duplicate time slot reservations
            $exists = Booking::where('service_id', $data['service_id'])
                ->where('booking_date', $data['booking_date'])
                ->where('time_slot_id', $data['time_slot_id'])
                ->where('status', '!=', 'cancelled')
                ->lockForUpdate()
                ->exists();

            if ($exists) {
                throw new SlotConflictException('Selected time slot is already reserved.');
            }

            return Booking::create([
                'user_id'      => $data['user_id'],
                'service_id'   => $data['service_id'],
                'time_slot_id' => $data['time_slot_id'],
                'booking_date' => $data['booking_date'],
                'status'       => 'confirmed',
            ]);
        });
    }
}`,
        },
      },
      {
        heading: 'Keeping Controllers Slim & Focused',
        content: [
          'With validation handled by FormRequests and domain logic encapsulated inside Service classes, the controller remains remarkably concise and easy to read.',
        ],
        codeBlock: {
          language: 'php',
          filename: 'app/Http/Controllers/BookingController.php',
          code: `<?php

namespace App\\Http\\Controllers;

use App\\Http\\Requests\\StoreBookingRequest;
use App\\Services\\BookingService;
use Illuminate\\Http\\JsonResponse;

class BookingController extends Controller
{
    public function __construct(
        protected BookingService $bookingService
    ) {}

    public function store(StoreBookingRequest $request): JsonResponse
    {
        $booking = $this->bookingService->createBooking($request->validated());

        return response()->json([
            'message' => 'Booking confirmed successfully.',
            'booking' => $booking->load(['service', 'user']),
        ], 201);
    }
}`,
        },
      },
    ],
    realWorldUseCase: {
      title: 'Security Service Booking Engine (SecureX)',
      scenario:
        'Managing technician time-slot reservations, conflict checks, and dynamic PDF invoice dispatch without code duplication.',
      implementation:
        'Structured the application around Laravel MVC with a BookingService handling atomic database transactions and conflict queries, while BookingController strictly handled HTTP responses.',
      impact:
        'Prevented double-booking race conditions and reduced controller line count by 65%, simplifying unit testing and future maintenance.',
    },
    keyTakeaways: [
      'Controllers should act as coordinators, delegating complex business operations to dedicated Service classes.',
      'Use FormRequest classes to isolate payload validation rules away from controller action methods.',
      'Leverage Eloquent relationships and eager loading (with()) to avoid N+1 database performance bottlenecks.',
      'Wrap multi-table database mutations inside DB::transaction() to maintain relational integrity.',
    ],
  },
  {
    slug: 'nextjs-server-vs-client-components',
    title: 'Next.js Server vs Client Components',
    summary:
      'Practical notes and personal learnings from building real-world projects with React Server Components (RSC) and Client Components in the Next.js App Router.',
    category: 'Next.js / Frontend',
    tags: ['Next.js', 'React', 'Server Components', 'Client Components'],
    publishedAt: '2026-08-26',
    formattedDate: 'August 26, 2026',
    readingTime: '6 min read',
    featured: true,
    isDraft: true,
    introduction:
      'When I transitioned from classic React SPAs to the Next.js App Router, understanding the boundary between Server Components and Client Components was one of the biggest learning curves. In Next.js, components run on the server by default. Based on my hands-on experience building web applications and this portfolio, here is a practical, beginner-to-intermediate breakdown of how both component types work and how I decide between them in real projects.',
    sections: [
      {
        heading: 'What I Learned: Server vs Client Components at a Glance',
        content: [
          'In the Next.js App Router, every component is a Server Component by default unless you explicitly add the "use client" directive at the top of the file.',
          '• Server Components (Default): These execute on the server at build-time (SSG) or request-time (SSR). Because their JavaScript logic is not shipped to the browser, they keep bundle sizes light and improve page load speed. They are ideal for layout structures, static content, and direct data fetching.',
          '• Client Components (marked with "use client"): These pre-render on the server as HTML and hydrate in the browser. They are required whenever you need client-side interactivity, state management, or browser APIs.',
        ],
        codeBlock: {
          language: 'typescript',
          filename: 'app/blog/[slug]/page.tsx (Server Component)',
          code: `// By default, pages in the App Router are Server Components.
// Content rendering logic stays on the server with zero client bundle overhead.
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/data/blog-posts'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-white">{post.title}</h1>
      <p className="text-sm text-gray-400 mt-2">{post.formattedDate} · {post.readingTime}</p>
      <div className="mt-6 text-gray-300">{post.introduction}</div>
    </article>
  )
}`,
        },
      },
      {
        heading: 'A Practical Rule of Thumb for "use client"',
        content: [
          'When I first started, I used to mark entire pages with "use client". Over time, I realized a much better approach is keeping the page on the server and isolating client interactivity into small leaf components.',
          'Here are the situations where I add "use client":',
          '1. User Events: When a component handles onClick, onChange, or onSubmit events.',
          '2. React State & Effects: When using useState(), useReducer(), or useEffect().',
          '3. Browser-Only APIs: When accessing localStorage, window, navigator, or clipboard APIs.',
        ],
        codeBlock: {
          language: 'typescript',
          filename: 'components/ui/copy-code-button.tsx (Client Component)',
          code: `'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

// Small, isolated leaf client component for clipboard interaction
export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white"
      aria-label="Copy code to clipboard"
    >
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  )
}`,
        },
      },
      {
        heading: 'Useful Composition Pattern: Passing Server Components as Children',
        content: [
          'A common scenario I encountered is wanting an animated container or client wrapper while keeping the inner content as Server Components. A clean solution is passing Server Components through the children prop of the Client Component.',
        ],
        codeBlock: {
          language: 'typescript',
          filename: 'components/ui/reveal.tsx (Client Wrapper)',
          code: `'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      {/* Children passed from a server page remain Server Components! */}
      {children}
    </motion.div>
  )
}`,
        },
      },
    ],
    realWorldUseCase: {
      title: 'Building This Portfolio Website',
      scenario:
        'Building a modern portfolio with fast page loads, dark styling, smooth animations, and interactive features like copy buttons and mobile navigation.',
      implementation:
        'I kept the main landing page and article readers as Server Components to ensure fast static delivery, while isolating interactive widgets (<CopyCodeButton />, <CustomCursor />, mobile navigation drawer) into targeted Client Components.',
      impact:
        'Helped maintain clean code organization, fast page transitions, and a responsive user experience without bundling unnecessary JavaScript.',
    },
    keyTakeaways: [
      'Keep components as Server Components by default to reduce browser bundle size and improve load times.',
      'Only use "use client" for components that actually need state, lifecycle hooks, or browser event listeners.',
      'Move "use client" boundaries down to small leaf components rather than making entire pages client-side.',
      'Pass Server Components as children into client animation wrappers to balance interactivity with performance.',
    ],
  },
]

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  return blogPosts.filter((post) => post.featured).slice(0, limit)
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const normalized = slug.toLowerCase().trim()
  return blogPosts.find((post) => post.slug.toLowerCase() === normalized)
}

export function getAdjacentBlogPosts(currentSlug: string): {
  previous: BlogPost | null
  next: BlogPost | null
} {
  const index = blogPosts.findIndex((post) => post.slug === currentSlug)
  if (index === -1) {
    return { previous: null, next: null }
  }

  const previous = index > 0 ? blogPosts[index - 1] : blogPosts[blogPosts.length - 1]
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : blogPosts[0]

  return { previous, next }
}

export function getAllBlogCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category))
  return ['All', ...Array.from(categories)]
}
