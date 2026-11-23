import { computed, createBlock, createCommentVNode, createSSRApp, createTextVNode, createVNode, defineComponent, h, mergeProps, onMounted, openBlock, ref, resolveDynamicComponent, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import { Head, Link, createInertiaApp, router, useForm, usePage } from "@inertiajs/vue3";
import { Toaster, toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import { createPinia, defineStore } from "pinia";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// resources/js/components/SeoHead.vue?vue&type=script&setup=true&lang.ts
var SeoHead_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SeoHead",
	__ssrInlineRender: true,
	props: { seo: {} },
	setup(__props) {
		const props = __props;
		const jsonLd = computed(() => props.seo?.json_ld ? JSON.stringify(props.seo.json_ld) : null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(Head), _attrs, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<title${_scopeId}>${ssrInterpolate(__props.seo?.title ?? "Acme Co")}</title><meta name="description"${ssrRenderAttr("content", __props.seo?.description ?? "")}${_scopeId}>`);
						if (__props.seo?.canonical) _push(`<link rel="canonical"${ssrRenderAttr("href", __props.seo.canonical)}${_scopeId}>`);
						else _push(`<!---->`);
						_push(`<meta property="og:type" content="website"${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.seo?.title ?? "Acme Co")}${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.seo?.description ?? "")}${_scopeId}>`);
						if (__props.seo?.og_image) _push(`<meta property="og:image"${ssrRenderAttr("content", __props.seo.og_image)}${_scopeId}>`);
						else _push(`<!---->`);
						_push(`<meta name="twitter:card" content="summary_large_image"${_scopeId}>`);
						if (jsonLd.value) ssrRenderVNode(_push, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(jsonLd.value)}`);
								else return [createTextVNode(toDisplayString(jsonLd.value), 1)];
							}),
							_: 1
						}), _parent, _scopeId);
						else _push(`<!---->`);
					} else return [
						createVNode("title", null, toDisplayString(__props.seo?.title ?? "Acme Co"), 1),
						createVNode("meta", {
							name: "description",
							content: __props.seo?.description ?? ""
						}, null, 8, ["content"]),
						__props.seo?.canonical ? (openBlock(), createBlock("link", {
							key: 0,
							rel: "canonical",
							href: __props.seo.canonical
						}, null, 8, ["href"])) : createCommentVNode("", true),
						createVNode("meta", {
							property: "og:type",
							content: "website"
						}),
						createVNode("meta", {
							property: "og:title",
							content: __props.seo?.title ?? "Acme Co"
						}, null, 8, ["content"]),
						createVNode("meta", {
							property: "og:description",
							content: __props.seo?.description ?? ""
						}, null, 8, ["content"]),
						__props.seo?.og_image ? (openBlock(), createBlock("meta", {
							key: 1,
							property: "og:image",
							content: __props.seo.og_image
						}, null, 8, ["content"])) : createCommentVNode("", true),
						createVNode("meta", {
							name: "twitter:card",
							content: "summary_large_image"
						}),
						jsonLd.value ? (openBlock(), createBlock(resolveDynamicComponent("script"), {
							key: 2,
							type: "application/ld+json"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(jsonLd.value), 1)]),
							_: 1
						})) : createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
		};
	}
});
// resources/js/components/SeoHead.vue
var _sfc_setup$19 = SeoHead_vue_vue_type_script_setup_true_lang_default.setup;
SeoHead_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/SeoHead.vue");
	return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
var SeoHead_default = SeoHead_vue_vue_type_script_setup_true_lang_default;
// resources/js/composables/useShared.ts
function useShared() {
	const page = usePage();
	return {
		user: computed(() => page.props.auth?.user ?? null),
		flash: computed(() => page.props.flash ?? {}),
		serverTheme: computed(() => page.props.theme ?? "system")
	};
}
// resources/js/pages/Account.vue?vue&type=script&setup=true&lang.ts
var Account_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Account",
	__ssrInlineRender: true,
	props: { seo: {} },
	setup(__props) {
		const { user } = useShared();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<div class="mx-auto max-w-2xl px-4 py-12 sm:px-6"><h1 class="text-4xl font-bold tracking-tight"> Account </h1><div class="mt-8 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"><p class="text-sm text-neutral-500"> Signed in as </p><p class="mt-1 text-lg font-semibold">${ssrInterpolate(unref(user)?.name)}</p><p class="text-sm text-neutral-500">${ssrInterpolate(unref(user)?.email)}</p><button type="button" class="mt-6 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold dark:border-neutral-700"> Sign out </button></div></div><!--]-->`);
		};
	}
});
// resources/js/pages/Account.vue
var Account_exports = /* @__PURE__ */ __exportAll({ default: () => Account_default });
var _sfc_setup$18 = Account_vue_vue_type_script_setup_true_lang_default.setup;
Account_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Account.vue");
	return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
var Account_default = Account_vue_vue_type_script_setup_true_lang_default;
// resources/js/layouts/AuthLayout.vue?vue&type=script&setup=true&lang.ts
var AuthLayout_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AuthLayout",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-950" }, _attrs))}><div class="w-full max-w-md">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
			_push(ssrRenderComponent(unref(Toaster), {
				"rich-colors": "",
				position: "top-center"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
// resources/js/layouts/AuthLayout.vue
var _sfc_setup$17 = AuthLayout_vue_vue_type_script_setup_true_lang_default.setup;
AuthLayout_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/AuthLayout.vue");
	return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
var AuthLayout_default = AuthLayout_vue_vue_type_script_setup_true_lang_default;
// resources/js/pages/Auth/CheckEmail.vue?vue&type=script&setup=true&lang.ts
var CheckEmail_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	layout: AuthLayout_default,
	__name: "CheckEmail",
	__ssrInlineRender: true,
	props: { email: {} },
	setup(__props) {
		const form = useForm({ email: __props.email ?? "" });
		const cooldown = ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: {
				title: "Check your email",
				description: "We sent you a sign-in link.",
				canonical: ""
			} }, null, _parent));
			_push(`<div class="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-950"><p class="text-4xl" aria-hidden="true"> ✉️ </p><h1 class="mt-4 text-2xl font-bold tracking-tight"> Check your email </h1><p class="mt-2 text-sm text-neutral-500"> We sent you a one-time sign-in link. It expires in 15 minutes. </p><div class="mt-6 flex flex-col items-center gap-3"><button type="button"${ssrIncludeBooleanAttr(unref(form).processing || cooldown.value > 0) ? " disabled" : ""} class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-neutral-950">${ssrInterpolate(cooldown.value > 0 ? `Resend link (${cooldown.value}s)` : "Resend link")}</button>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/login",
				class: "text-sm font-semibold underline underline-offset-4"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Use a different email `);
					else return [createTextVNode(" Use a different email ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><!--]-->`);
		};
	}
});
// resources/js/pages/Auth/CheckEmail.vue
var CheckEmail_exports = /* @__PURE__ */ __exportAll({ default: () => CheckEmail_default });
var _sfc_setup$16 = CheckEmail_vue_vue_type_script_setup_true_lang_default.setup;
CheckEmail_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Auth/CheckEmail.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
var CheckEmail_default = CheckEmail_vue_vue_type_script_setup_true_lang_default;
// resources/js/lib/schemas.ts
var emailSchema = z.object({ email: z.string().min(1, "Email is required").email("Enter a valid email").max(255) });
toTypedSchema(emailSchema);
var contactSchema = z.object({
	name: z.string().min(1, "Name is required").max(120),
	email: z.string().min(1, "Email is required").email("Enter a valid email").max(255),
	subject: z.string().max(180).optional().or(z.literal("")),
	message: z.string().min(10, "Tell us a little more (min 10 characters)").max(5e3)
});
toTypedSchema(contactSchema);
var applicationSchema = z.object({
	name: z.string().min(1, "Name is required").max(120),
	email: z.string().min(1, "Email is required").email("Enter a valid email").max(255),
	cover_html: z.string().max(1e4).optional().or(z.literal("")),
	cv: z.any().optional()
});
toTypedSchema(applicationSchema);
// resources/js/pages/Auth/Login.vue?vue&type=script&setup=true&lang.ts
var Login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	layout: AuthLayout_default,
	__name: "Login",
	__ssrInlineRender: true,
	props: { seo: {} },
	setup(__props) {
		const form = useForm({ email: "" });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: {
				title: "Sign in",
				description: "Sign in with a magic link sent to your email.",
				canonical: "",
				...__props.seo
			} }, null, _parent));
			_push(`<div class="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"><h1 class="text-2xl font-bold tracking-tight"> Sign in </h1><p class="mt-2 text-sm text-neutral-500"> Enter your email and we will send you a one-time sign-in link. </p><form class="mt-6 grid gap-4" novalidate><label class="grid gap-1 text-sm"><span class="font-medium">Email</span><input${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" autofocus class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">`);
			if (unref(form).errors.email) _push(`<span class="text-sm text-red-600">${ssrInterpolate(unref(form).errors.email)}</span>`);
			else _push(`<!---->`);
			_push(`</label><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-neutral-950">${ssrInterpolate(unref(form).processing ? "Sending…" : "Send sign-in link")}</button></form></div><!--]-->`);
		};
	}
});
// resources/js/pages/Auth/Login.vue
var Login_exports = /* @__PURE__ */ __exportAll({ default: () => Login_default });
var _sfc_setup$15 = Login_vue_vue_type_script_setup_true_lang_default.setup;
Login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Auth/Login.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
var Login_default = Login_vue_vue_type_script_setup_true_lang_default;
// resources/js/pages/Blog/Index.vue?vue&type=script&setup=true&lang.ts
var Index_vue_vue_type_script_setup_true_lang_default$2 = /*@__PURE__*/ defineComponent({
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		seo: {},
		posts: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6"><h1 class="text-4xl font-bold tracking-tight"> Blog </h1><div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.posts.data, (post) => {
				_push(ssrRenderComponent(unref(Link), {
					key: post.slug,
					href: `/blog/${post.slug}`,
					class: "flex flex-col rounded-2xl border border-neutral-200 p-5 transition hover:shadow-sm dark:border-neutral-800"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							if (post.featured) _push(`<img${ssrRenderAttr("src", post.featured)}${ssrRenderAttr("alt", post.title)} loading="lazy" class="mb-4 aspect-video w-full rounded-xl object-cover"${_scopeId}>`);
							else _push(`<!---->`);
							_push(`<p class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(post.title)}</p>`);
							if (post.excerpt) _push(`<p class="mt-2 text-sm text-neutral-500 line-clamp-3"${_scopeId}>${ssrInterpolate(post.excerpt)}</p>`);
							else _push(`<!---->`);
							if (post.published_at) {
								_push(`<p class="mt-auto pt-4 text-xs text-neutral-400"${_scopeId}>${ssrInterpolate(post.published_at)}`);
								if (post.reading_minutes) _push(`<span${_scopeId}> · ${ssrInterpolate(post.reading_minutes)} min read</span>`);
								else _push(`<!---->`);
								_push(`</p>`);
							} else _push(`<!---->`);
						} else return [
							post.featured ? (openBlock(), createBlock("img", {
								key: 0,
								src: post.featured,
								alt: post.title,
								loading: "lazy",
								class: "mb-4 aspect-video w-full rounded-xl object-cover"
							}, null, 8, ["src", "alt"])) : createCommentVNode("", true),
							createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(post.title), 1),
							post.excerpt ? (openBlock(), createBlock("p", {
								key: 1,
								class: "mt-2 text-sm text-neutral-500 line-clamp-3"
							}, toDisplayString(post.excerpt), 1)) : createCommentVNode("", true),
							post.published_at ? (openBlock(), createBlock("p", {
								key: 2,
								class: "mt-auto pt-4 text-xs text-neutral-400"
							}, [createTextVNode(toDisplayString(post.published_at), 1), post.reading_minutes ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(post.reading_minutes) + " min read", 1)) : createCommentVNode("", true)])) : createCommentVNode("", true)
						];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div>`);
			if (__props.posts.last_page > 1) {
				_push(`<nav class="mt-10 flex flex-wrap gap-2" aria-label="Pagination"><!--[-->`);
				ssrRenderList(__props.posts.links, (link) => {
					_push(`<!--[-->`);
					if (!link.url) _push(`<span class="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm opacity-50 dark:border-neutral-800">${link.label ?? ""}</span>`);
					else _push(ssrRenderComponent(unref(Link), {
						href: link.url,
						class: ["rounded-lg border px-3 py-1.5 text-sm", [link.active ? "border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950" : "border-neutral-200 dark:border-neutral-800"]]
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span${_scopeId}>${link.label ?? ""}</span>`);
							else return [createVNode("span", { innerHTML: link.label }, null, 8, ["innerHTML"])];
						}),
						_: 2
					}, _parent));
					_push(`<!--]-->`);
				});
				_push(`<!--]--></nav>`);
			} else _push(`<!---->`);
			_push(`</div><!--]-->`);
		};
	}
});
// resources/js/pages/Blog/Index.vue
var Index_exports$2 = /* @__PURE__ */ __exportAll({ default: () => Index_default$2 });
var _sfc_setup$14 = Index_vue_vue_type_script_setup_true_lang_default$2.setup;
Index_vue_vue_type_script_setup_true_lang_default$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Blog/Index.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
var Index_default$2 = Index_vue_vue_type_script_setup_true_lang_default$2;
// resources/js/components/RichContent.vue?vue&type=script&setup=true&lang.ts
var RichContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RichContent",
	__ssrInlineRender: true,
	props: { html: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.html) _push(`<div${ssrRenderAttrs(mergeProps({ class: "prose-cms" }, _attrs))}>${__props.html ?? ""}</div>`);
			else _push(`<p${ssrRenderAttrs(mergeProps({ class: "text-neutral-500" }, _attrs))}> Content coming soon. </p>`);
		};
	}
});
// resources/js/components/RichContent.vue
var _sfc_setup$13 = RichContent_vue_vue_type_script_setup_true_lang_default.setup;
RichContent_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/RichContent.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var RichContent_default = RichContent_vue_vue_type_script_setup_true_lang_default;
// resources/js/pages/Blog/Show.vue?vue&type=script&setup=true&lang.ts
var Show_vue_vue_type_script_setup_true_lang_default$2 = /*@__PURE__*/ defineComponent({
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		seo: {},
		post: {},
		related: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">`);
			if (__props.post.category) _push(`<p class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">${ssrInterpolate(__props.post.category.name)}</p>`);
			else _push(`<!---->`);
			_push(`<h1 class="mt-2 text-4xl font-bold tracking-tight text-balance">${ssrInterpolate(__props.post.title)}</h1>`);
			if (__props.post.published_at) {
				_push(`<p class="mt-3 text-sm text-neutral-500">${ssrInterpolate(__props.post.published_at)}`);
				if (__props.post.reading_minutes) _push(`<span> · ${ssrInterpolate(__props.post.reading_minutes)} min read</span>`);
				else _push(`<!---->`);
				if (__props.post.author) _push(`<span> · ${ssrInterpolate(__props.post.author.name)}</span>`);
				else _push(`<!---->`);
				_push(`</p>`);
			} else _push(`<!---->`);
			if (__props.post.featured) _push(`<img${ssrRenderAttr("src", __props.post.featured)}${ssrRenderAttr("alt", __props.post.title)} class="mt-8 aspect-video w-full rounded-2xl object-cover">`);
			else _push(`<!---->`);
			_push(ssrRenderComponent(RichContent_default, {
				html: __props.post.content_html,
				class: "mt-6"
			}, null, _parent));
			if (__props.post.tags?.length) {
				_push(`<div class="mt-8 flex flex-wrap gap-2"><!--[-->`);
				ssrRenderList(__props.post.tags, (tag) => {
					_push(`<span class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium dark:bg-neutral-900">${ssrInterpolate(tag.name)}</span>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</article>`);
			if (__props.related.length) {
				_push(`<section class="mx-auto max-w-6xl px-4 pb-16 sm:px-6"><h2 class="text-2xl font-bold tracking-tight"> Keep reading </h2><div class="mt-6 grid gap-6 sm:grid-cols-3"><!--[-->`);
				ssrRenderList(__props.related, (item) => {
					_push(ssrRenderComponent(unref(Link), {
						key: item.slug,
						href: `/blog/${item.slug}`,
						class: "rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<p class="font-semibold"${_scopeId}>${ssrInterpolate(item.title)}</p>`);
							else return [createVNode("p", { class: "font-semibold" }, toDisplayString(item.title), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></section>`);
			} else _push(`<!---->`);
			_push(`<!--]-->`);
		};
	}
});
// resources/js/pages/Blog/Show.vue
var Show_exports$2 = /* @__PURE__ */ __exportAll({ default: () => Show_default$2 });
var _sfc_setup$12 = Show_vue_vue_type_script_setup_true_lang_default$2.setup;
Show_vue_vue_type_script_setup_true_lang_default$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Blog/Show.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var Show_default$2 = Show_vue_vue_type_script_setup_true_lang_default$2;
// resources/js/pages/Careers/Index.vue?vue&type=script&setup=true&lang.ts
var Index_vue_vue_type_script_setup_true_lang_default$1 = /*@__PURE__*/ defineComponent({
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		seo: {},
		vacancies: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6"><h1 class="text-4xl font-bold tracking-tight"> Careers </h1><p class="mt-3 text-neutral-500"> Join us in shipping production-grade websites. </p>`);
			if (__props.vacancies.length) {
				_push(`<div class="mt-8 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800"><!--[-->`);
				ssrRenderList(__props.vacancies, (vacancy) => {
					_push(ssrRenderComponent(unref(Link), {
						key: vacancy.slug,
						href: `/careers/${vacancy.slug}`,
						class: "flex items-center justify-between gap-4 p-5 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div${_scopeId}><p class="font-semibold"${_scopeId}>${ssrInterpolate(vacancy.title)}</p><p class="text-sm text-neutral-500"${_scopeId}>${ssrInterpolate(vacancy.location)}`);
								if (vacancy.employment_type) _push(`<span${_scopeId}> · ${ssrInterpolate(vacancy.employment_type)}</span>`);
								else _push(`<!---->`);
								_push(`</p></div><span aria-hidden="true"${_scopeId}>→</span>`);
							} else return [createVNode("div", null, [createVNode("p", { class: "font-semibold" }, toDisplayString(vacancy.title), 1), createVNode("p", { class: "text-sm text-neutral-500" }, [createTextVNode(toDisplayString(vacancy.location), 1), vacancy.employment_type ? (openBlock(), createBlock("span", { key: 0 }, " · " + toDisplayString(vacancy.employment_type), 1)) : createCommentVNode("", true)])]), createVNode("span", { "aria-hidden": "true" }, "→")];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<p class="mt-8 rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700"> No open roles right now — check back soon. </p>`);
			_push(`</div><!--]-->`);
		};
	}
});
// resources/js/pages/Careers/Index.vue
var Index_exports$1 = /* @__PURE__ */ __exportAll({ default: () => Index_default$1 });
var _sfc_setup$11 = Index_vue_vue_type_script_setup_true_lang_default$1.setup;
Index_vue_vue_type_script_setup_true_lang_default$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Careers/Index.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var Index_default$1 = Index_vue_vue_type_script_setup_true_lang_default$1;
// resources/js/pages/Careers/Show.vue?vue&type=script&setup=true&lang.ts
var Show_vue_vue_type_script_setup_true_lang_default$1 = /*@__PURE__*/ defineComponent({
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		seo: {},
		vacancy: {}
	},
	setup(__props) {
		const form = useForm({
			name: "",
			email: "",
			cover_html: "",
			cv: null
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6"><h1 class="text-4xl font-bold tracking-tight text-balance">${ssrInterpolate(__props.vacancy.title)}</h1><p class="mt-2 text-neutral-500">${ssrInterpolate(__props.vacancy.location)}`);
			if (__props.vacancy.employment_type) _push(`<span> · ${ssrInterpolate(__props.vacancy.employment_type)}</span>`);
			else _push(`<!---->`);
			_push(`</p>`);
			_push(ssrRenderComponent(RichContent_default, {
				html: __props.vacancy.description_html,
				class: "mt-6"
			}, null, _parent));
			_push(`<form class="mt-10 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800" novalidate><h2 class="text-xl font-bold"> Apply </h2><div class="mt-4 grid gap-4"><label class="grid gap-1 text-sm"><span class="font-medium">Name</span><input${ssrRenderAttr("value", unref(form).name)} type="text" autocomplete="name" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">`);
			if (unref(form).errors.name) _push(`<span class="text-sm text-red-600">${ssrInterpolate(unref(form).errors.name)}</span>`);
			else _push(`<!---->`);
			_push(`</label><label class="grid gap-1 text-sm"><span class="font-medium">Email</span><input${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">`);
			if (unref(form).errors.email) _push(`<span class="text-sm text-red-600">${ssrInterpolate(unref(form).errors.email)}</span>`);
			else _push(`<!---->`);
			_push(`</label><label class="grid gap-1 text-sm"><span class="font-medium">Cover note</span><textarea rows="5" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">${ssrInterpolate(unref(form).cover_html)}</textarea></label><label class="grid gap-1 text-sm"><span class="font-medium">CV (PDF/DOC, max 5MB)</span><input type="file" accept=".pdf,.doc,.docx"></label><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-neutral-950">${ssrInterpolate(unref(form).processing ? "Sending…" : "Submit application")}</button></div></form></div><!--]-->`);
		};
	}
});
// resources/js/pages/Careers/Show.vue
var Show_exports$1 = /* @__PURE__ */ __exportAll({ default: () => Show_default$1 });
var _sfc_setup$10 = Show_vue_vue_type_script_setup_true_lang_default$1.setup;
Show_vue_vue_type_script_setup_true_lang_default$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Careers/Show.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var Show_default$1 = Show_vue_vue_type_script_setup_true_lang_default$1;
// resources/js/pages/Contact.vue?vue&type=script&setup=true&lang.ts
var Contact_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Contact",
	__ssrInlineRender: true,
	props: { seo: {} },
	setup(__props) {
		const form = useForm({
			name: "",
			email: "",
			subject: "",
			message: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<div class="mx-auto max-w-2xl px-4 py-12 sm:px-6"><h1 class="text-4xl font-bold tracking-tight"> Contact </h1><p class="mt-3 text-neutral-500"> Tell us about your project. We reply within one business day. </p><form class="mt-8 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800" novalidate><div class="grid gap-4"><label class="grid gap-1 text-sm"><span class="font-medium">Name</span><input${ssrRenderAttr("value", unref(form).name)} type="text" autocomplete="name" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">`);
			if (unref(form).errors.name) _push(`<span class="text-sm text-red-600">${ssrInterpolate(unref(form).errors.name)}</span>`);
			else _push(`<!---->`);
			_push(`</label><label class="grid gap-1 text-sm"><span class="font-medium">Email</span><input${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">`);
			if (unref(form).errors.email) _push(`<span class="text-sm text-red-600">${ssrInterpolate(unref(form).errors.email)}</span>`);
			else _push(`<!---->`);
			_push(`</label><label class="grid gap-1 text-sm"><span class="font-medium">Subject <span class="text-neutral-400">(optional)</span></span><input${ssrRenderAttr("value", unref(form).subject)} type="text" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700"></label><label class="grid gap-1 text-sm"><span class="font-medium">Message</span><textarea rows="6" class="rounded-lg border border-neutral-300 bg-transparent px-3 py-2 dark:border-neutral-700">${ssrInterpolate(unref(form).message)}</textarea>`);
			if (unref(form).errors.message) _push(`<span class="text-sm text-red-600">${ssrInterpolate(unref(form).errors.message)}</span>`);
			else _push(`<!---->`);
			_push(`</label><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-neutral-950">${ssrInterpolate(unref(form).processing ? "Sending…" : "Send message")}</button></div></form></div><!--]-->`);
		};
	}
});
// resources/js/pages/Contact.vue
var Contact_exports = /* @__PURE__ */ __exportAll({ default: () => Contact_default });
var _sfc_setup$9 = Contact_vue_vue_type_script_setup_true_lang_default.setup;
Contact_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Contact.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var Contact_default = Contact_vue_vue_type_script_setup_true_lang_default;
// resources/js/pages/Faq.vue?vue&type=script&setup=true&lang.ts
var Faq_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Faq",
	__ssrInlineRender: true,
	props: {
		seo: {},
		groups: {}
	},
	setup(__props) {
		const open = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6"><h1 class="text-4xl font-bold tracking-tight"> FAQ </h1><!--[-->`);
			ssrRenderList(__props.groups, (items, group) => {
				_push(`<div class="mt-8"><h2 class="text-lg font-semibold capitalize">${ssrInterpolate(group)}</h2><div class="mt-3 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800"><!--[-->`);
				ssrRenderList(items, (faq, i) => {
					_push(`<div class="p-5"><button type="button" class="flex w-full items-center justify-between gap-4 text-left font-medium">${ssrInterpolate(faq.question)} <span aria-hidden="true">${ssrInterpolate(open.value === `${group}-${i}` ? "−" : "+")}</span></button>`);
					if (open.value === `${group}-${i}`) _push(`<div class="prose-cms mt-3">${faq.answer_html ?? ""}</div>`);
					else _push(`<!---->`);
					_push(`</div>`);
				});
				_push(`<!--]--></div></div>`);
			});
			_push(`<!--]--></div><!--]-->`);
		};
	}
});
// resources/js/pages/Faq.vue
var Faq_exports = /* @__PURE__ */ __exportAll({ default: () => Faq_default });
var _sfc_setup$8 = Faq_vue_vue_type_script_setup_true_lang_default.setup;
Faq_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Faq.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var Faq_default = Faq_vue_vue_type_script_setup_true_lang_default;
// resources/js/pages/Home.vue?vue&type=script&setup=true&lang.ts
var Home_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Home",
	__ssrInlineRender: true,
	props: {
		seo: {},
		posts: {},
		projects: {},
		testimonials: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<section class="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6"><p class="text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400"> Laravel · Filament · Vue </p><h1 class="mt-3 max-w-3xl text-5xl font-bold tracking-tight text-balance"> Production-grade websites, shipped fast. </h1><p class="mt-4 max-w-2xl text-lg text-neutral-500"> We build company sites with a real CMS, passwordless login, SEO-ready SSR, and media on Cloudflare R2. </p><div class="mt-8 flex gap-3">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/work",
				class: "rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-950"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` See our work `);
					else return [createTextVNode(" See our work ")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(unref(Link), {
				href: "/contact",
				class: "rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold dark:border-neutral-700"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Contact us `);
					else return [createTextVNode(" Contact us ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></section>`);
			if (__props.projects.length) {
				_push(`<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6"><h2 class="text-2xl font-bold tracking-tight"> Selected work </h2><div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList(__props.projects, (project) => {
					_push(ssrRenderComponent(unref(Link), {
						key: project.slug,
						href: `/work/${project.slug}`,
						class: "group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (project.cover) _push(`<img${ssrRenderAttr("src", project.cover)}${ssrRenderAttr("alt", project.title)} loading="lazy" class="aspect-video w-full object-cover"${_scopeId}>`);
								else _push(`<!---->`);
								_push(`<div class="p-4"${_scopeId}><p class="text-lg font-semibold group-hover:underline"${_scopeId}>${ssrInterpolate(project.title)}</p>`);
								if (project.summary) _push(`<p class="mt-1 text-sm text-neutral-500 line-clamp-2"${_scopeId}>${ssrInterpolate(project.summary)}</p>`);
								else _push(`<!---->`);
								_push(`</div>`);
							} else return [project.cover ? (openBlock(), createBlock("img", {
								key: 0,
								src: project.cover,
								alt: project.title,
								loading: "lazy",
								class: "aspect-video w-full object-cover"
							}, null, 8, ["src", "alt"])) : createCommentVNode("", true), createVNode("div", { class: "p-4" }, [createVNode("p", { class: "text-lg font-semibold group-hover:underline" }, toDisplayString(project.title), 1), project.summary ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-1 text-sm text-neutral-500 line-clamp-2"
							}, toDisplayString(project.summary), 1)) : createCommentVNode("", true)])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></section>`);
			} else _push(`<!---->`);
			if (__props.posts.length) {
				_push(`<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6"><div class="flex items-baseline justify-between"><h2 class="text-2xl font-bold tracking-tight"> Latest posts </h2>`);
				_push(ssrRenderComponent(unref(Link), {
					href: "/blog",
					class: "text-sm font-semibold hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` All posts → `);
						else return [createTextVNode(" All posts → ")];
					}),
					_: 1
				}, _parent));
				_push(`</div><div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList(__props.posts, (post) => {
					_push(ssrRenderComponent(unref(Link), {
						key: post.slug,
						href: `/blog/${post.slug}`,
						class: "rounded-2xl border border-neutral-200 p-5 transition hover:shadow-sm dark:border-neutral-800"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<p class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(post.title)}</p>`);
								if (post.excerpt) _push(`<p class="mt-2 text-sm text-neutral-500 line-clamp-3"${_scopeId}>${ssrInterpolate(post.excerpt)}</p>`);
								else _push(`<!---->`);
							} else return [createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(post.title), 1), post.excerpt ? (openBlock(), createBlock("p", {
								key: 0,
								class: "mt-2 text-sm text-neutral-500 line-clamp-3"
							}, toDisplayString(post.excerpt), 1)) : createCommentVNode("", true)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></section>`);
			} else _push(`<!---->`);
			if (__props.testimonials.length) {
				_push(`<section class="mx-auto max-w-6xl px-4 py-12 sm:px-6"><h2 class="text-2xl font-bold tracking-tight"> What clients say </h2><div class="mt-6 grid gap-6 md:grid-cols-2"><!--[-->`);
				ssrRenderList(__props.testimonials, (t) => {
					_push(`<figure class="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"><blockquote class="text-neutral-700 dark:text-neutral-300"> “${ssrInterpolate(t.quote)}” </blockquote><figcaption class="mt-4 text-sm font-semibold">${ssrInterpolate(t.author)} `);
					if (t.company) _push(`<span class="font-normal text-neutral-500"> · ${ssrInterpolate(t.company)}</span>`);
					else _push(`<!---->`);
					_push(`</figcaption></figure>`);
				});
				_push(`<!--]--></div></section>`);
			} else _push(`<!---->`);
			_push(`<!--]-->`);
		};
	}
});
// resources/js/pages/Home.vue
var Home_exports = /* @__PURE__ */ __exportAll({ default: () => Home_default });
var _sfc_setup$7 = Home_vue_vue_type_script_setup_true_lang_default.setup;
Home_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Home.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var Home_default = Home_vue_vue_type_script_setup_true_lang_default;
// resources/js/pages/Page.vue?vue&type=script&setup=true&lang.ts
var Page_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Page",
	__ssrInlineRender: true,
	props: {
		seo: {},
		page: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">`);
			if (__props.page.hero) _push(`<img${ssrRenderAttr("src", __props.page.hero)}${ssrRenderAttr("alt", __props.page.title)} class="mb-8 aspect-video w-full rounded-2xl object-cover">`);
			else _push(`<!---->`);
			_push(`<h1 class="text-4xl font-bold tracking-tight text-balance">${ssrInterpolate(__props.page.title)}</h1>`);
			if (__props.page.excerpt) _push(`<p class="mt-3 text-lg text-neutral-500">${ssrInterpolate(__props.page.excerpt)}</p>`);
			else _push(`<!---->`);
			_push(ssrRenderComponent(RichContent_default, {
				html: __props.page.content_html,
				class: "mt-6"
			}, null, _parent));
			_push(`<p class="mt-10">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/contact",
				class: "inline-flex rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-neutral-950"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Work with us `);
					else return [createTextVNode(" Work with us ")];
				}),
				_: 1
			}, _parent));
			_push(`</p></article><!--]-->`);
		};
	}
});
// resources/js/pages/Page.vue
var Page_exports = /* @__PURE__ */ __exportAll({ default: () => Page_default });
var _sfc_setup$6 = Page_vue_vue_type_script_setup_true_lang_default.setup;
Page_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Page.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var Page_default = Page_vue_vue_type_script_setup_true_lang_default;
// resources/js/pages/Work/Index.vue?vue&type=script&setup=true&lang.ts
var Index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Index",
	__ssrInlineRender: true,
	props: {
		seo: {},
		projects: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6"><h1 class="text-4xl font-bold tracking-tight"> Work </h1><div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
			ssrRenderList(__props.projects.data, (project) => {
				_push(ssrRenderComponent(unref(Link), {
					key: project.slug,
					href: `/work/${project.slug}`,
					class: "group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							if (project.cover) _push(`<img${ssrRenderAttr("src", project.cover)}${ssrRenderAttr("alt", project.title)} loading="lazy" class="aspect-video w-full object-cover"${_scopeId}>`);
							else _push(`<!---->`);
							_push(`<div class="p-4"${_scopeId}><p class="text-lg font-semibold group-hover:underline"${_scopeId}>${ssrInterpolate(project.title)}</p>`);
							if (project.summary) _push(`<p class="mt-1 text-sm text-neutral-500 line-clamp-2"${_scopeId}>${ssrInterpolate(project.summary)}</p>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else return [project.cover ? (openBlock(), createBlock("img", {
							key: 0,
							src: project.cover,
							alt: project.title,
							loading: "lazy",
							class: "aspect-video w-full object-cover"
						}, null, 8, ["src", "alt"])) : createCommentVNode("", true), createVNode("div", { class: "p-4" }, [createVNode("p", { class: "text-lg font-semibold group-hover:underline" }, toDisplayString(project.title), 1), project.summary ? (openBlock(), createBlock("p", {
							key: 0,
							class: "mt-1 text-sm text-neutral-500 line-clamp-2"
						}, toDisplayString(project.summary), 1)) : createCommentVNode("", true)])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div><!--]-->`);
		};
	}
});
// resources/js/pages/Work/Index.vue
var Index_exports = /* @__PURE__ */ __exportAll({ default: () => Index_default });
var _sfc_setup$5 = Index_vue_vue_type_script_setup_true_lang_default.setup;
Index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Work/Index.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Index_default = Index_vue_vue_type_script_setup_true_lang_default;
// resources/js/pages/Work/Show.vue?vue&type=script&setup=true&lang.ts
var Show_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Show",
	__ssrInlineRender: true,
	props: {
		seo: {},
		project: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<!--[-->`);
			_push(ssrRenderComponent(SeoHead_default, { seo: __props.seo }, null, _parent));
			_push(`<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">`);
			if (__props.project.cover) _push(`<img${ssrRenderAttr("src", __props.project.cover)}${ssrRenderAttr("alt", __props.project.title)} class="mb-8 aspect-video w-full rounded-2xl object-cover">`);
			else _push(`<!---->`);
			if (__props.project.client) {
				_push(`<p class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">${ssrInterpolate(__props.project.client)}`);
				if (__props.project.year) _push(`<span> · ${ssrInterpolate(__props.project.year)}</span>`);
				else _push(`<!---->`);
				_push(`</p>`);
			} else _push(`<!---->`);
			_push(`<h1 class="mt-2 text-4xl font-bold tracking-tight text-balance">${ssrInterpolate(__props.project.title)}</h1>`);
			_push(ssrRenderComponent(RichContent_default, {
				html: __props.project.content_html,
				class: "mt-6"
			}, null, _parent));
			if (__props.project.gallery?.length) {
				_push(`<div class="mt-8 grid gap-4 sm:grid-cols-2"><!--[-->`);
				ssrRenderList(__props.project.gallery, (src, i) => {
					_push(`<img${ssrRenderAttr("src", src)}${ssrRenderAttr("alt", `${__props.project.title} image ${i + 1}`)} loading="lazy" class="rounded-xl">`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			if (__props.project.project_url) _push(`<p class="mt-8"><a${ssrRenderAttr("href", __props.project.project_url)} target="_blank" rel="noopener" class="text-sm font-semibold underline underline-offset-4"> Visit live site → </a></p>`);
			else _push(`<!---->`);
			_push(`</article><!--]-->`);
		};
	}
});
// resources/js/pages/Work/Show.vue
var Show_exports = /* @__PURE__ */ __exportAll({ default: () => Show_default });
var _sfc_setup$4 = Show_vue_vue_type_script_setup_true_lang_default.setup;
Show_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Work/Show.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var Show_default = Show_vue_vue_type_script_setup_true_lang_default;
// resources/js/components/SiteFooter.vue?vue&type=script&setup=true&lang.ts
var SiteFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SiteFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-neutral-200 dark:border-neutral-800" }, _attrs))}><div class="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4"><div><p class="text-lg font-bold"> Acme Co </p><p class="mt-2 text-sm text-neutral-500"> Production-grade websites with Laravel, Filament, and Vue. </p></div><nav aria-label="Company"><p class="text-sm font-semibold"> Company </p><ul class="mt-3 space-y-2 text-sm text-neutral-500"><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/about",
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` About `);
					else return [createTextVNode(" About ")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/work",
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Work `);
					else return [createTextVNode(" Work ")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/careers",
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Careers `);
					else return [createTextVNode(" Careers ")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></nav><nav aria-label="Resources"><p class="text-sm font-semibold"> Resources </p><ul class="mt-3 space-y-2 text-sm text-neutral-500"><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/blog",
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Blog `);
					else return [createTextVNode(" Blog ")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/faq",
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` FAQ `);
					else return [createTextVNode(" FAQ ")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/contact",
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Contact `);
					else return [createTextVNode(" Contact ")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></nav><nav aria-label="Legal"><p class="text-sm font-semibold"> Account </p><ul class="mt-3 space-y-2 text-sm text-neutral-500"><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/login",
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sign in `);
					else return [createTextVNode(" Sign in ")];
				}),
				_: 1
			}, _parent));
			_push(`</li><li>`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/account",
				class: "hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Account `);
					else return [createTextVNode(" Account ")];
				}),
				_: 1
			}, _parent));
			_push(`</li></ul></nav></div><div class="border-t border-neutral-200 dark:border-neutral-800"><p class="mx-auto max-w-6xl px-4 py-4 text-xs text-neutral-500 sm:px-6"> © ${ssrInterpolate(unref(year))} Acme Co. All rights reserved. </p></div></footer>`);
		};
	}
});
// resources/js/components/SiteFooter.vue
var _sfc_setup$3 = SiteFooter_vue_vue_type_script_setup_true_lang_default.setup;
SiteFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/SiteFooter.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var SiteFooter_default = SiteFooter_vue_vue_type_script_setup_true_lang_default;
// resources/js/stores/theme.ts
function systemPrefersDark() {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
var useThemeStore = defineStore("theme", () => {
	const theme = ref("system");
	const resolved = computed(() => {
		if (theme.value === "system") return systemPrefersDark() ? "dark" : "light";
		return theme.value;
	});
	function apply(value) {
		if (typeof document === "undefined") return;
		document.documentElement.classList.toggle("dark", value === "dark");
		document.documentElement.style.colorScheme = value;
	}
	function set(value) {
		theme.value = value;
		try {
			document.cookie = `theme=${value}; path=/; max-age=31536000; SameSite=Lax`;
			if (typeof localStorage !== "undefined") localStorage.setItem("theme", value);
		} catch {}
		apply(resolved.value);
	}
	function init(initial) {
		let start = "system";
		if (initial === "light" || initial === "dark" || initial === "system") start = initial;
		else if (typeof localStorage !== "undefined") {
			const saved = localStorage.getItem("theme");
			if (saved === "light" || saved === "dark" || saved === "system") start = saved;
		}
		theme.value = start;
		apply(resolved.value);
		if (typeof window !== "undefined" && typeof window.matchMedia === "function") window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
			if (theme.value === "system") apply(resolved.value);
		});
	}
	return {
		theme,
		resolved,
		set,
		init
	};
});
// resources/js/components/ThemeSwitcher.vue?vue&type=script&setup=true&lang.ts
var ThemeSwitcher_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ThemeSwitcher",
	__ssrInlineRender: true,
	setup(__props) {
		const theme = useThemeStore();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				type: "button",
				class: "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900",
				"aria-label": `Theme: ${unref(theme).theme}. Activate to switch.`,
				title: `Theme: ${unref(theme).theme}`
			}, _attrs))}>`);
			if (unref(theme).resolved === "dark") _push(`<span aria-hidden="true">◐</span>`);
			else _push(`<span aria-hidden="true">◑</span>`);
			_push(`</button>`);
		};
	}
});
// resources/js/components/ThemeSwitcher.vue
var _sfc_setup$2 = ThemeSwitcher_vue_vue_type_script_setup_true_lang_default.setup;
ThemeSwitcher_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ThemeSwitcher.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ThemeSwitcher_default = ThemeSwitcher_vue_vue_type_script_setup_true_lang_default;
// resources/js/stores/ui.ts
var useUiStore = defineStore("ui", () => {
	const mobileNavOpen = ref(false);
	function toggleNav(value) {
		mobileNavOpen.value = value ?? !mobileNavOpen.value;
	}
	return {
		mobileNavOpen,
		toggleNav
	};
});
// resources/js/components/SiteNav.vue?vue&type=script&setup=true&lang.ts
var SiteNav_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SiteNav",
	__ssrInlineRender: true,
	setup(__props) {
		const { user } = useShared();
		const ui = useUiStore();
		const menuOpen = ref(false);
		const links = [
			{
				href: "/",
				label: "Home"
			},
			{
				href: "/about",
				label: "About"
			},
			{
				href: "/services",
				label: "Services"
			},
			{
				href: "/work",
				label: "Work"
			},
			{
				href: "/blog",
				label: "Blog"
			},
			{
				href: "/careers",
				label: "Careers"
			},
			{
				href: "/faq",
				label: "FAQ"
			},
			{
				href: "/contact",
				label: "Contact"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-40 border-b border-neutral-200/70 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80" }, _attrs))}><nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Primary">`);
			_push(ssrRenderComponent(unref(Link), {
				href: "/",
				class: "text-lg font-bold tracking-tight text-neutral-950 dark:text-white"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Acme Co `);
					else return [createTextVNode(" Acme Co ")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hidden items-center gap-1 md:flex"><!--[-->`);
			ssrRenderList(links, (link) => {
				_push(ssrRenderComponent(unref(Link), {
					key: link.href,
					href: link.href,
					class: "rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.label)}`);
						else return [createTextVNode(toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div><div class="flex items-center gap-2">`);
			_push(ssrRenderComponent(ThemeSwitcher_default, null, null, _parent));
			if (!unref(user)) _push(ssrRenderComponent(unref(Link), {
				href: "/login",
				class: "hidden rounded-lg bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex dark:bg-white dark:text-neutral-950"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Sign in `);
					else return [createTextVNode(" Sign in ")];
				}),
				_: 1
			}, _parent));
			else {
				_push(`<div class="relative hidden md:block"><button type="button" class="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold dark:border-neutral-800"${ssrRenderAttr("aria-expanded", menuOpen.value)} aria-haspopup="menu">${ssrInterpolate(unref(user).name)}</button><div role="menu" class="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-950" style="${ssrRenderStyle(menuOpen.value ? null : { display: "none" })}"><p class="truncate border-b border-neutral-100 px-4 py-2 text-xs text-neutral-500 dark:border-neutral-900">${ssrInterpolate(unref(user).email)}</p>`);
				_push(ssrRenderComponent(unref(Link), {
					href: "/account",
					role: "menuitem",
					class: "block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900",
					onClick: ($event) => menuOpen.value = false
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Account `);
						else return [createTextVNode(" Account ")];
					}),
					_: 1
				}, _parent));
				if (unref(user).is_admin) _push(`<a href="/admin" role="menuitem" class="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"> Admin panel </a>`);
				else _push(`<!---->`);
				_push(`<button type="button" role="menuitem" class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-900"> Sign out </button></div></div>`);
			}
			_push(`<button type="button" class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 md:hidden dark:border-neutral-800" aria-label="Toggle menu"> ☰ </button></div></nav>`);
			if (unref(ui).mobileNavOpen) {
				_push(`<div class="border-t border-neutral-200 px-4 py-3 md:hidden dark:border-neutral-800"><div class="grid gap-1"><!--[-->`);
				ssrRenderList(links, (link) => {
					_push(ssrRenderComponent(unref(Link), {
						key: link.href,
						href: link.href,
						class: "rounded-lg px-3 py-2 text-sm font-medium",
						onClick: ($event) => unref(ui).toggleNav(false)
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(link.label)}`);
							else return [createTextVNode(toDisplayString(link.label), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</header>`);
		};
	}
});
// resources/js/components/SiteNav.vue
var _sfc_setup$1 = SiteNav_vue_vue_type_script_setup_true_lang_default.setup;
SiteNav_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/SiteNav.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var SiteNav_default = SiteNav_vue_vue_type_script_setup_true_lang_default;
// resources/js/stores/auth.ts
var useAuthStore = defineStore("auth", () => {
	const user = ref(null);
	function setUser(value) {
		user.value = value;
	}
	return {
		user,
		setUser
	};
});
// resources/js/layouts/AppLayout.vue?vue&type=script&setup=true&lang.ts
var AppLayout_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppLayout",
	__ssrInlineRender: true,
	setup(__props) {
		const { flash, user, serverTheme } = useShared();
		const auth = useAuthStore();
		const theme = useThemeStore();
		auth.setUser(user.value);
		theme.init(serverTheme.value);
		function showFlash() {
			if (flash.value.message) (flash.value.type === "error" ? toast.error : flash.value.type === "info" ? toast.message : toast.success)(flash.value.message);
		}
		onMounted(() => {
			showFlash();
			router.on("finish", () => {
				auth.setUser(user.value);
				showFlash();
			});
		});
		watch(user, (value) => auth.setUser(value));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100" }, _attrs))}>`);
			_push(ssrRenderComponent(SiteNav_default, null, null, _parent));
			_push(`<main>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main>`);
			_push(ssrRenderComponent(SiteFooter_default, null, null, _parent));
			_push(ssrRenderComponent(unref(Toaster), {
				"rich-colors": "",
				position: "top-center"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
// resources/js/layouts/AppLayout.vue
var _sfc_setup = AppLayout_vue_vue_type_script_setup_true_lang_default.setup;
AppLayout_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/AppLayout.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppLayout_default = AppLayout_vue_vue_type_script_setup_true_lang_default;
// resources/js/ssr.ts
var renderPage = (page) => createInertiaApp({
	page,
	render: renderToString,
	resolve: (name) => {
		const resolved = (/* @__PURE__ */ Object.assign({
			"./pages/Account.vue": Account_exports,
			"./pages/Auth/CheckEmail.vue": CheckEmail_exports,
			"./pages/Auth/Login.vue": Login_exports,
			"./pages/Blog/Index.vue": Index_exports$2,
			"./pages/Blog/Show.vue": Show_exports$2,
			"./pages/Careers/Index.vue": Index_exports$1,
			"./pages/Careers/Show.vue": Show_exports$1,
			"./pages/Contact.vue": Contact_exports,
			"./pages/Faq.vue": Faq_exports,
			"./pages/Home.vue": Home_exports,
			"./pages/Page.vue": Page_exports,
			"./pages/Work/Index.vue": Index_exports,
			"./pages/Work/Show.vue": Show_exports
		}))[`./pages/${name}.vue`];
		if (!resolved) throw new Error(`Unknown page: ${name}`);
		const component = resolved.default;
		component.layout ??= AppLayout_default;
		return resolved;
	},
	setup({ App, props, plugin }) {
		const app = createSSRApp({ render: () => h(App, props) });
		app.use(createPinia());
		app.use(plugin);
		return app;
	}
});
createServer(renderPage);
export { renderPage as default };

//# sourceMappingURL=ssr.js.map