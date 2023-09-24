<!--Test with this URL: http://localhost:5173/stats?clickTimes=0,125480,126015,126620,127227,127848,128505,129164.99999999999,129771.00000000001&gameLength=8 -->

<script>
    import { page } from "$app/stores";
    console.log($page.url.searchParams.get("clickTimes"))
</script>

<p>These are the analytics</p>
<p>Game length: {$page.url.searchParams.get("gameLength")}</p>
<p>Click times: {$page.url.searchParams.get("clickTimes")}</p>
